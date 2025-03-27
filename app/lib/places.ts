import { Client } from '@googlemaps/google-maps-services-js';
import { Place } from './models/Place';
import connectDB, { getCachedResults, cacheResults } from './mongodb';

const client = new Client({});

const PLACE_DETAIL_FIELDS = [
  'formatted_phone_number',
  'website',
  'photos',
  'reviews',
  'rating',
  'user_ratings_total',
  'geometry',
  'formatted_address',
] as const;

export interface PlaceData {
  place_id: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating: number;
  reviews: number;
  photos?: string[];
  category: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  last_updated: Date;
}

export async function searchPlaces(category: string, city: string): Promise<PlaceData[]> {
  await connectDB();

  // Check cache first
  const cachedPlaces = await Place.find({
    category: category.toLowerCase(),
    city: city.toLowerCase(),
    last_updated: { $gt: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000) } // 6 months
  }).exec();

  if (cachedPlaces.length > 0) {
    return cachedPlaces;
  }

  // If not in cache, search using Google Places API
  try {
    const query = `${category} in ${city}, Florida`;
    const response = await client.textSearch({
      params: {
        query,
        key: process.env.GOOGLE_PLACES_API_KEY!,
        region: 'us',
      },
    });

    if (response.data.status === 'OK' && response.data.results) {
      const places = await Promise.all(
        response.data.results.map(async (result) => {
          if (!result.place_id || !result.geometry?.location) {
            return null;
          }

          // Get place details for additional information
          const detailsResponse = await client.placeDetails({
            params: {
              place_id: result.place_id,
              key: process.env.GOOGLE_PLACES_API_KEY!,
              fields: PLACE_DETAIL_FIELDS,
            },
          });

          const placeData: PlaceData = {
            place_id: result.place_id,
            name: result.name || '',
            address: result.formatted_address || '',
            phone: detailsResponse.data.result?.formatted_phone_number || '',
            website: detailsResponse.data.result?.website || '',
            rating: result.rating || 0,
            reviews: result.user_ratings_total || 0,
            photos: result.photos?.map(photo => photo.photo_reference) || [],
            category: category.toLowerCase(),
            city: city.toLowerCase(),
            state: 'Florida',
            country: 'USA',
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
            last_updated: new Date(),
          };

          // Cache the place data
          await Place.findOneAndUpdate(
            { place_id: placeData.place_id },
            placeData,
            { upsert: true, new: true }
          );

          return placeData;
        })
      );

      return places.filter((place): place is PlaceData => place !== null);
    }

    return [];
  } catch (error) {
    console.error('Error searching places:', error);
    return [];
  }
}

export async function getPlaceDetails(placeId: string): Promise<PlaceData | null> {
  const query = `place-${placeId}`;
  
  // Check cache first
  const cachedResult = await getCachedResults(query);
  if (cachedResult) {
    return cachedResult[0];
  }

  try {
    const response = await client.placeDetails({
      params: {
        place_id: placeId,
        fields: PLACE_DETAIL_FIELDS,
        key: process.env.GOOGLE_MAPS_API_KEY!,
      },
    });

    if (!response.data.result) {
      return null;
    }

    const placeData = response.data.result as PlaceData;

    // Cache the result
    await cacheResults(query, [placeData]);

    return placeData;
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
} 