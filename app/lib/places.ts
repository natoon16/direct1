import { Client } from '@googlemaps/google-maps-services-js';
import { Place } from './models/Place';
import { getCachedResults, cacheResults } from './mongodb';
import { PlaceData } from './types';
import { Vendor } from '../data/vendors';

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

type PlaceFields = typeof PLACE_DETAIL_FIELDS[number];

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACES_API_URL = 'https://places.googleapis.com/v1/places:searchText';

export type { PlaceData };

export async function searchPlaces(category: string, city: string): Promise<PlaceData[]> {
  try {
    const response = await fetch(GOOGLE_PLACES_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY || '',
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.phoneNumber,places.websiteUri,places.rating,places.userRatingCount'
      },
      body: JSON.stringify({
        textQuery: `${category} in ${city}, Florida`,
        pageSize: 20
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch places');
    }

    const data = await response.json();
    return data.places.map((place: any) => ({
      id: place.id,
      name: place.displayName?.text || '',
      address: place.formattedAddress || '',
      phone: place.phoneNumber || '',
      website: place.websiteUri || '',
      rating: place.rating || 0,
      reviews: place.userRatingCount || 0
    }));
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
}

export function convertPlaceToVendor(place: PlaceData, category: string, city: string): Vendor {
  return {
    id: place.id,
    name: place.name,
    category,
    city,
    description: `Professional ${category.toLowerCase()} services in ${city}.`,
    phone: place.phone || '(555) 555-5555',
    email: `contact@${place.name.toLowerCase().replace(/\s+/g, '')}.com`,
    website: place.website || `www.${place.name.toLowerCase().replace(/\s+/g, '')}.com`,
    rating: place.rating || 4.5,
    reviews: place.reviews || 50
  };
}

export async function getPlaceDetails(placeId: string): Promise<PlaceData | null> {
  try {
    const query = `place-${placeId}`;
    
    // Check cache first
    const cachedResult = await getCachedResults(query);
    if (cachedResult.length > 0) {
      return cachedResult[0];
    }

    const response = await client.placeDetails({
      params: {
        place_id: placeId,
        fields: [...PLACE_DETAIL_FIELDS],
        key: process.env.GOOGLE_MAPS_API_KEY!,
      },
    });

    if (!response.data.result) {
      return null;
    }

    const place = response.data.result;
    if (!place.place_id || !place.geometry?.location) {
      console.error('Place missing required data:', place);
      return null;
    }

    const placeData: PlaceData = {
      place_id: place.place_id,
      name: place.name || '',
      address: place.formatted_address || '',
      phone: place.formatted_phone_number || '',
      website: place.website || '',
      rating: place.rating || 0,
      reviews: place.user_ratings_total || 0,
      photos: place.photos?.map(photo => 
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo.photo_reference}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      ) || [],
      category: '', // This will be set by the caller
      city: '', // This will be set by the caller
      state: 'florida',
      country: 'united states',
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      last_updated: new Date(),
    };

    // Cache the result
    await cacheResults(query, placeData);

    return placeData;
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
} 