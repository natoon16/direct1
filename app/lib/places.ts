import { MongoClient } from 'mongodb';
import { cache } from 'react';

const MONGODB_URI = process.env.MONGODB_URI!;
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY!;

export interface Place {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport?: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  rating?: number;
  user_ratings_total?: number;
  photos?: string[];  // Simplified photo structure - just array of URLs
  website?: string;
  types?: string[];
  business_status?: string;
  icon?: string;
  icon_background_color?: string;
  icon_mask_base_uri?: string;
}

interface CacheEntry {
  _id: string;
  places: Place[];
  timestamp: Date;
}

// Initialize MongoDB client
const client = new MongoClient(MONGODB_URI);

// Cache the connection promise
let clientPromise: Promise<MongoClient> = client.connect();

// Cache the search results for 24 hours
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const searchPlaces = cache(async (query: string, city: string, category: string): Promise<{ places: Place[] }> => {
  try {
    const db = (await clientPromise).db('wedding-directory');
    const collection = db.collection<CacheEntry>('places-cache');

    // Create a cache key
    const cacheKey = `${city}-${category}-${query}`.toLowerCase();

    // Check cache first
    const cachedResult = await collection.findOne({ 
      _id: cacheKey,
      timestamp: { $gt: new Date(Date.now() - CACHE_DURATION) }
    });

    if (cachedResult) {
      return { places: cachedResult.places };
    }

    // If not in cache, fetch from Google Places API
    const searchQuery = `${category} wedding ${query} in ${city}, FL`;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${GOOGLE_PLACES_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Google Places API');
    }

    const data = await response.json();
    
    // Transform the results
    const places: Place[] = data.results.map((result: any) => ({
      place_id: result.place_id,
      name: result.name,
      formatted_address: result.formatted_address,
      rating: result.rating,
      user_ratings_total: result.user_ratings_total,
      photos: result.photos?.map((photo: any) => photo.photo_reference) || [],
      geometry: {
        location: {
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng
        },
        viewport: result.geometry.viewport
      },
      types: result.types,
      business_status: result.business_status,
      icon: result.icon,
      icon_background_color: result.icon_background_color,
      icon_mask_base_uri: result.icon_mask_base_uri
    }));

    // Cache the results
    await collection.updateOne(
      { _id: cacheKey },
      { 
        $set: {
          places,
          timestamp: new Date()
        }
      },
      { upsert: true }
    );

    return { places };
  } catch (error) {
    console.error('Error searching places:', error);
    return { places: [] };
  }
}); 