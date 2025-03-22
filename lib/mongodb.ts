import { MongoClient, Document } from 'mongodb';
import { cache } from 'react';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

interface Vendor {
  name: string;
  address: string;
  rating?: number;
  website?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  placeId?: string;
  category?: string;
  city: string;
  lastUpdated: Date;
}

interface GooglePlace {
  name: string;
  formatted_address: string;
  rating?: number;
  website?: string;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    }
  };
  place_id: string;
}

// Cache the database connection for 6 months (in milliseconds)
const SIX_MONTHS = 15778800000;

export const getVendors = cache(async (city: string, category?: string) => {
  try {
    const client = await clientPromise;
    const db = client.db("weddingDirectory");
    const collection = db.collection<Vendor>("vendors");

    // Create query based on city and optional category
    const query: Document = {
      city: city.toLowerCase(),
      lastUpdated: { $gt: new Date(Date.now() - SIX_MONTHS) }
    };
    
    if (category) {
      query.category = category.toLowerCase();
    }

    // Find vendors matching the query
    const vendors = await collection.find(query).toArray();

    // If no vendors found or data is stale, fetch from Google Places API
    if (vendors.length === 0) {
      console.log('No vendors found in cache, fetching from Google Places...');
      const newVendors = await fetchFromGooglePlaces(city, category);
      console.log('Fetched vendors:', newVendors.length);
      
      if (newVendors.length > 0) {
        // Insert new vendors with timestamp
        const vendorsToInsert: Vendor[] = newVendors.map((vendor: Partial<Vendor>) => ({
          ...vendor,
          lastUpdated: new Date(),
          city: city.toLowerCase(),
          category: category?.toLowerCase(),
          name: vendor.name || '',
          address: vendor.address || ''
        }));
        
        await collection.insertMany(vendorsToInsert);
        return vendorsToInsert;
      }
    }

    return vendors;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return [];
  }
});

async function fetchFromGooglePlaces(city: string, category?: string): Promise<Partial<Vendor>[]> {
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    throw new Error('Google Places API key is missing');
  }

  try {
    const searchQuery = `wedding ${category || 'venue'} in ${city}, Florida`;
    console.log('Searching Google Places for:', searchQuery);
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${process.env.GOOGLE_PLACES_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Places API error:', errorText);
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Google Places API response:', JSON.stringify(data, null, 2));
    
    if (!data.results || !Array.isArray(data.results)) {
      console.error('Unexpected API response format:', data);
      return [];
    }

    return data.results.map((place: GooglePlace) => ({
      name: place.name,
      address: place.formatted_address,
      rating: place.rating,
      website: place.website,
      location: place.geometry?.location ? {
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng
      } : undefined,
      placeId: place.place_id
    }));
  } catch (error) {
    console.error('Error fetching from Google Places:', error);
    return [];
  }
} 