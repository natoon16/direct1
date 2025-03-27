import { Client } from '@googlemaps/google-maps-services-js';
import { Place } from './models/Place';
import { getCachedResults, cacheResults } from './mongodb';
import { PlaceData } from './types';
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

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
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
    console.log('Searching for:', { category, city });

    // First, try to get from MongoDB cache
    const client = await clientPromise;
    const db = client.db("weddingDirectory");
    const collection = db.collection<CachedVendor>("vendors");

    const query = {
      city: city.toLowerCase(),
      category: category.toLowerCase(),
      lastUpdated: { $gt: new Date(Date.now() - SIX_MONTHS) }
    };

    console.log('MongoDB query:', query);
    const cachedVendors = await collection.find(query).toArray();
    console.log('Found cached vendors:', cachedVendors.length);

    if (cachedVendors.length > 0) {
      return cachedVendors.map((vendor: CachedVendor) => ({
        id: vendor.placeId || vendor._id?.toString() || '',
        name: vendor.name,
        address: vendor.address,
        phone: vendor.phone || '',
        website: vendor.website || '',
        rating: vendor.rating || 0,
        reviews: vendor.reviews || 0,
        lat: vendor.location?.latitude || 0,
        lng: vendor.location?.longitude || 0,
        category: vendor.category || category,
        city: vendor.city || city,
        state: 'florida',
        country: 'united states',
        last_updated: vendor.lastUpdated || new Date()
      }));
    }

    // If no cached results, fetch from Google Places API
    console.log('No cached results, fetching from Google Places API');
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

    const places = data.places.map((place: any) => ({
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

    // Cache the results in MongoDB
    if (places.length > 0) {
      try {
        const vendorsToCache = places.map((place: PlaceData) => ({
          placeId: place.id,
          name: place.name,
          address: place.address,
          phone: place.phone,
          website: place.website,
          rating: place.rating,
          reviews: place.reviews,
          location: {
            latitude: place.lat,
            longitude: place.lng
          },
          category: place.category,
          city: place.city,
          lastUpdated: place.last_updated
        }));

        await collection.insertMany(vendorsToCache);
        console.log('Cached new vendors in MongoDB:', vendorsToCache.length);
      } catch (error) {
        console.error('Error caching vendors:', error);
      }
    }

    return places;
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