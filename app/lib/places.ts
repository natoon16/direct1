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
  'photos',
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
    if (!GOOGLE_PLACES_API_KEY) {
      throw new Error('Google Places API key is not configured');
    }

    const searchQuery = `${category} wedding vendors in ${city}, Florida`;
    console.log('Searching with query:', searchQuery);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${GOOGLE_PLACES_API_KEY}&region=us&type=establishment`
    );

    if (!response.ok) {
      throw new Error(`Places API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Places API response:', data);

    if (data.status !== 'OK') {
      console.error('Places API error:', data.status, data.error_message);
      return [];
    }

    return data.results.map((place: any) => ({
      id: place.place_id,
      name: place.name,
      address: place.formatted_address,
      rating: place.rating,
      reviews: place.user_ratings_total,
      photos: place.photos?.map((photo: any) => photo.photo_reference) || [],
      website: place.website,
      phone: place.formatted_phone_number,
      location: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      },
      category,
      city,
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
    description: `Wedding ${category} in ${city}, Florida`,
    category: category,
    city: city,
    rating: place.rating,
    reviews: place.reviews,
    photos: place.photos,
    website: place.website,
    phone: place.phone,
    address: place.address,
    location: place.location,
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
      photos: place.photos?.map((photo: any) => photo.photo_reference) || [],
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