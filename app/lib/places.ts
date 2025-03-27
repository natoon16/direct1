import { Client, PlaceDetailsResponse } from '@googlemaps/google-maps-services-js';
import { Place } from './models/Place';
import connectDB, { getCachedResults, cacheResults } from './mongodb';
import { PlaceData } from './types';

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

type PlaceFields = (typeof PLACE_DETAIL_FIELDS)[number];

// Convert readonly array to mutable array
const placeDetailFields: PlaceFields[] = [...PLACE_DETAIL_FIELDS];

export type { PlaceData };

export async function searchPlaces(category: string, city: string): Promise<PlaceData[]> {
  console.log('Searching for:', { category, city });
  
  await connectDB();

  // Check cache first
  const cachedPlaces = await Place.find({
    category: category.toLowerCase(),
    city: city.toLowerCase(),
    last_updated: { $gt: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000) } // 6 months
  }).exec();

  console.log('Cached places found:', cachedPlaces.length);

  if (cachedPlaces.length > 0) {
    return cachedPlaces;
  }

  // If not in cache, search using Google Places API
  try {
    // Modify the query to be more flexible
    const query = `${category} wedding vendor ${city} FL`;
    console.log('Google Places API query:', query);

    const response = await client.textSearch({
      params: {
        query,
        key: process.env.GOOGLE_PLACES_API_KEY!,
        region: 'us',
        type: 'establishment', // Add this to focus on businesses
      },
    });

    console.log('Google Places API response status:', response.data.status);
    console.log('Results found:', response.data.results?.length || 0);

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
              fields: placeDetailFields,
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

      const filteredPlaces = places.filter((place): place is PlaceData => place !== null);
      console.log('Final places count:', filteredPlaces.length);
      return filteredPlaces;
    }

    console.log('No results found or API error');
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
        fields: PLACE_DETAIL_FIELDS as PlaceFields[],
        key: process.env.GOOGLE_MAPS_API_KEY!,
      },
    });

    if (!response.data.result) {
      return null;
    }

    const result = response.data.result;
    const placeData: PlaceData = {
      place_id: placeId,
      name: result.name || '',
      address: result.formatted_address || '',
      phone: result.formatted_phone_number || '',
      website: result.website || '',
      rating: result.rating || 0,
      reviews: result.user_ratings_total || 0,
      photos: result.photos?.map(photo => photo.photo_reference) || [],
      category: '',  // These will be filled by the caller
      city: '',
      state: 'Florida',
      country: 'USA',
      lat: result.geometry?.location?.lat || 0,
      lng: result.geometry?.location?.lng || 0,
      last_updated: new Date(),
    };

    // Cache the result
    await cacheResults(query, [placeData]);

    return placeData;
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
} 