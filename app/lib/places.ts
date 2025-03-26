import { Client, PlaceData, PlacesNearbyResponse } from '@googlemaps/google-maps-services-js';
import { getCachedResults, cacheResults } from './mongodb';

const client = new Client({});

export interface Place {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number;
  user_ratings_total?: number;
  website?: string;
  phone?: string;
  opening_hours?: {
    open_now: boolean;
    weekday_text: string[];
  };
  price_level?: number;
  types: string[];
}

const PLACE_FIELDS = [
  'name',
  'formatted_address',
  'rating',
  'user_ratings_total',
  'website',
  'phone',
  'opening_hours',
  'price_level',
  'types',
];

const PLACE_DETAIL_FIELDS = [
  ...PLACE_FIELDS,
  'reviews',
  'formatted_phone_number',
  'international_phone_number',
  'business_status',
];

export async function searchPlaces(
  city: string,
  category: string,
  page: number = 1,
  pageSize: number = 20
) {
  const query = `${city}-${category}-${page}`;
  
  // Check cache first
  const cachedResults = await getCachedResults(query);
  if (cachedResults) {
    return { places: cachedResults };
  }

  try {
    // First, get the city's coordinates
    const geocodeResponse = await client.geocode({
      params: {
        address: `${city}, Florida`,
        key: process.env.GOOGLE_MAPS_API_KEY!,
      },
    });

    if (!geocodeResponse.data.results.length) {
      throw new Error('City not found');
    }

    const location = geocodeResponse.data.results[0].geometry.location;

    // Search for places
    const placesResponse = await client.placesNearby({
      params: {
        location,
        radius: 50000, // 50km radius
        type: category.toLowerCase(),
        key: process.env.GOOGLE_MAPS_API_KEY!,
      },
    });

    // Get detailed information for each place
    const places = await Promise.all(
      placesResponse.data.results.map(async (place) => {
        if (!place.place_id) return null;
        
        const detailsResponse = await client.placeDetails({
          params: {
            place_id: place.place_id,
            fields: PLACE_FIELDS,
            key: process.env.GOOGLE_MAPS_API_KEY!,
          },
        });

        return detailsResponse.data.result as Place;
      })
    );

    // Filter out null values and cache the results
    const validPlaces = places.filter((place): place is Place => place !== null);
    await cacheResults(query, validPlaces);

    return { places: validPlaces };
  } catch (error) {
    console.error('Error searching places:', error);
    throw error;
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