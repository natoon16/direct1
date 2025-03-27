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
    console.log('Searching for:', { category, city });

    const response = await fetch('/api/places', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category, city })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', {
        status: response.status,
        error: errorData
      });
      throw new Error(`Failed to fetch places: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    if (!data.places || !Array.isArray(data.places)) {
      console.error('Invalid API response format:', data);
      return [];
    }

    return data.places.map((place: any) => ({
      id: place.id,
      name: place.displayName?.text || '',
      address: place.formattedAddress || '',
      phone: place.phoneNumber || '',
      website: place.websiteUri || '',
      rating: place.rating || 0,
      reviews: place.userRatingCount || 0,
      lat: place.location?.latitude || 0,
      lng: place.location?.longitude || 0,
      category: category,
      city: city,
      state: 'florida',
      country: 'united states',
      last_updated: new Date()
    }));
  } catch (error) {
    console.error('Error in searchPlaces:', error);
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
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY || '',
        'X-Goog-FieldMask': 'id,displayName,formattedAddress,phoneNumber,websiteUri,rating,userRatingCount,location'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch place details');
    }

    const place = await response.json();
    if (!place.id || !place.location) {
      console.error('Place missing required data:', place);
      return null;
    }

    return {
      id: place.id,
      name: place.displayName?.text || '',
      address: place.formattedAddress || '',
      phone: place.phoneNumber || '',
      website: place.websiteUri || '',
      rating: place.rating || 0,
      reviews: place.userRatingCount || 0,
      category: '', // This will be set by the caller
      city: '', // This will be set by the caller
      state: 'florida',
      country: 'united states',
      lat: place.location.latitude || 0,
      lng: place.location.longitude || 0,
      last_updated: new Date(),
    };
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
} 