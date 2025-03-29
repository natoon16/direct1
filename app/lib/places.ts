import { Client } from '@googlemaps/google-maps-services-js';
import { Place } from './models/Place';
import { getCachedResults, cacheResults } from './mongodb';
import { PlaceData } from '../types/places';
import { Vendor } from '../types/vendor';
import clientPromise from '../../lib/mongodb';
import { MongoClient } from 'mongodb';

const client = new Client({});

const PLACE_DETAIL_FIELDS = [
  'formatted_phone_number',
  'website',
  'reviews',
  'rating',
  'user_ratings_total',
  'formatted_address',
] as const;

type PlaceFields = typeof PLACE_DETAIL_FIELDS[number];

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

if (!GOOGLE_PLACES_API_KEY) {
  throw new Error('GOOGLE_PLACES_API_KEY is not defined');
}

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined');
}

const clientMongo = new MongoClient(MONGODB_URI);

interface PlaceSearchResponse {
  places: Array<{
    id: string;
    displayName: {
      text: string;
    };
    formattedAddress: string;
    businessStatus?: string;
    rating?: number;
    userRatingCount?: number;
    phoneNumbers?: string[];
    websiteUri?: string;
  }>;
  status: string;
  error_message?: string;
}

export type { PlaceData };

export async function searchPlaces(category: string, city: string): Promise<Vendor[]> {
  try {
    // Connect to MongoDB
    await clientMongo.connect();
    const db = clientMongo.db('weddingdirectory');
    const collection = db.collection<Vendor>('vendors');

    // Check cache first
    const cachedResults = await collection.find({
      category,
      city: { $regex: new RegExp(city, 'i') }
    }).toArray();

    if (cachedResults.length > 0) {
      return cachedResults;
    }

    // If not in cache, search Google Places API
    const query = `${category} wedding vendors in ${city}, Florida`;
    const searchUrl = `https://places.googleapis.com/v1/places:searchText`;
    
    const response = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.websiteUri,places.businessStatus,places.phoneNumbers'
      } as HeadersInit,
      body: JSON.stringify({
        textQuery: query,
        locationBias: {
          circle: {
            center: {
              latitude: 27.6648,  // Approximate center of Florida
              longitude: -81.5158
            },
            radius: 500000.0  // 500km radius to cover most of Florida
          }
        },
        maxResultCount: 20
      })
    });

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.statusText}`);
    }

    const data: PlaceSearchResponse = await response.json();

    if (data.places) {
      const vendors: Vendor[] = data.places.map(place => ({
        id: place.id,
        placeId: place.id,
        name: place.displayName.text,
        category,
        address: place.formattedAddress,
        city,
        state: 'FL',
        phone: place.phoneNumbers?.[0] || '',
        website: place.websiteUri || '',
        email: '', // Not available from Places API
        rating: place.rating || 0,
        reviewCount: place.userRatingCount || 0,
        businessStatus: (place.businessStatus as Vendor['businessStatus']) || 'OPERATIONAL',
        description: `Wedding ${category} in ${city}, Florida`,
        reviews: place.userRatingCount || 0,
        location: {
          lat: 0, // Not needed
          lng: 0
        }
      }));

      // Cache the results
      if (vendors.length > 0) {
        await collection.insertMany(
          vendors.map(vendor => ({
            ...vendor,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) // 180 days cache
          }))
        );
      }

      return vendors;
    }

    return [];
  } catch (error) {
    console.error('Error searching places:', error);
    throw error;
  } finally {
    await clientMongo.close();
  }
}

export function convertPlaceToVendor(place: PlaceData | Vendor, category: string, city: string): Vendor {
  // If it's already a Vendor, just return it
  if ('placeId' in place) {
    return place as Vendor;
  }

  // If it's a PlaceData, convert it
  const placeData = place as PlaceData;
  return {
    id: placeData.id,
    name: placeData.name,
    category,
    address: placeData.address,
    city,
    state: 'FL',
    phone: placeData.phone || '',
    email: placeData.email || '',
    website: placeData.website || '',
    rating: placeData.rating || 0,
    reviewCount: placeData.reviewCount || 0,
    businessStatus: (placeData.businessStatus as Vendor['businessStatus']) || 'OPERATIONAL',
    placeId: placeData.id,
    description: `Wedding ${category} in ${city}, Florida`,
    reviews: placeData.reviewCount || 0,
    location: {
      lat: 0, // We don't need location data
      lng: 0
    }
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
    if (!place.id) {
      console.error('Place missing required data:', place);
      return null;
    }

    return {
      id: place.id,
      placeId: place.id,
      name: place.displayName?.text || '',
      address: place.formattedAddress || '',
      phone: place.phoneNumber || '',
      website: place.websiteUri || '',
      rating: place.rating || 0,
      reviewCount: place.userRatingCount || 0,
      businessStatus: place.businessStatus || 'OPERATIONAL',
      email: ''
    };
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
} 