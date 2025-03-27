import { Client } from '@googlemaps/google-maps-services-js';
import { Place } from './models/Place';
import connectDB from './mongodb';

const client = new Client({});

export async function searchPlaces(category: string, city: string) {
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

    if (response.data.status === 'OK') {
      const places = await Promise.all(
        response.data.results.map(async (result) => {
          // Get place details for additional information
          const detailsResponse = await client.placeDetails({
            params: {
              place_id: result.place_id,
              key: process.env.GOOGLE_PLACES_API_KEY!,
              fields: ['formatted_phone_number', 'website', 'photos', 'reviews'],
            },
          });

          const placeData = {
            place_id: result.place_id,
            name: result.name,
            address: result.formatted_address,
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

      return places;
    }

    return [];
  } catch (error) {
    console.error('Error searching places:', error);
    return [];
  }
}

export async function getPlaceDetails(placeId: string) {
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

    // Cache the result
    await cacheResults(query, [response.data.result]);

    return response.data.result as Place;
  } catch (error) {
    console.error('Error getting place details:', error);
    throw error;
  }
} 