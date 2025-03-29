import { Client } from '@googlemaps/google-maps-services-js';
import { Place } from './models/Place';
import { getCachedResults, cacheResults } from './mongodb';
import { PlaceData } from '../types/places';
import { Vendor } from '../data/vendors';
import clientPromise from '../../lib/mongodb';

const client = new Client({});

const PLACE_DETAIL_FIELDS = [
  'formatted_phone_number',
  'website',
  'reviews',
  'rating',
  'user_ratings_total',
  'geometry',
  'formatted_address',
] as const;

type PlaceFields = typeof PLACE_DETAIL_FIELDS[number];

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

if (!GOOGLE_PLACES_API_KEY) {
  console.error('GOOGLE_PLACES_API_KEY is not set in environment variables');
}

const GOOGLE_PLACES_API_URL = 'https://places.googleapis.com/v1/places:searchText';

const SIX_MONTHS = 15778800000; // 6 months in milliseconds

interface CachedVendor {
  _id?: string;
  placeId?: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: number;
  location?: {
    latitude: number;
    longitude: number;
  };
  category?: string;
  city: string;
  lastUpdated: Date;
}

export type { PlaceData };

export async function searchPlaces(category: string, city: string): Promise<PlaceData[]> {
  try {
    const response = await fetch('/api/places/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category, city })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.places || [];
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
    rating: place.rating,
    reviews: place.reviews,
    website: place.website,
    phone: place.phone,
    address: place.address,
    location: place.location,
    description: `Wedding ${category} in ${city}, Florida`,
  };
}

export async function getPlaceDetails(placeId: string): Promise<PlaceData | null> {
  try {
    const response = await fetch('/api/places', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ placeId })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', {
        status: response.status,
        error: errorData
      });
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
      location: {
        lat: place.location.latitude || 0,
        lng: place.location.longitude || 0,
      },
      category: '', // This will be set by the caller
      city: '', // This will be set by the caller
    };
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
} 