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
    console.log('Getting vendors for:', { city, category });
    const client = await clientPromise;
    const db = client.db("weddingDirectory");
    const collection = db.collection<Vendor>("vendors");

    const query: Document = {
      city: city.toLowerCase(),
      lastUpdated: { $gt: new Date(Date.now() - SIX_MONTHS) }
    };
    
    if (category) {
      query.category = category.toLowerCase();
    }

    console.log('MongoDB query:', query);
    const vendors = await collection.find(query).toArray();
    console.log('Found vendors in MongoDB:', vendors.length);

    if (vendors.length === 0) {
      console.log('No vendors found in cache, fetching from Google Places...');
      const newVendors = await fetchFromGooglePlaces(city, category);
      console.log('Fetched vendors from Google Places:', newVendors.length);
      
      if (newVendors.length > 0) {
        const vendorsToInsert: Vendor[] = newVendors.map((vendor: Partial<Vendor>) => ({
          ...vendor,
          lastUpdated: new Date(),
          city: city.toLowerCase(),
          category: category?.toLowerCase(),
          name: vendor.name || '',
          address: vendor.address || ''
        }));
        
        console.log('Inserting new vendors into MongoDB:', vendorsToInsert.length);
        await collection.insertMany(vendorsToInsert);
        return vendorsToInsert;
      }
    }

    return vendors;
  } catch (error) {
    console.error('Error in getVendors:', error);
    return [];
  }
});

async function fetchFromGooglePlaces(city: string, category?: string): Promise<Partial<Vendor>[]> {
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    throw new Error('Google Places API key is missing');
  }

  try {
    const searchQuery = category 
      ? `wedding ${category} in ${city}, Florida`
      : `wedding venues in ${city}, Florida`;
    console.log('Google Places search query:', searchQuery);
    
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${process.env.GOOGLE_PLACES_API_KEY}&type=establishment`;
    console.log('Google Places API URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Places API error response:', errorText);
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status !== 'OK') {
      console.error('Google Places API returned non-OK status:', data.status);
      console.error('Error message:', data.error_message);
      return [];
    }

    if (!data.results || !Array.isArray(data.results)) {
      console.error('Unexpected API response format:', data);
      return [];
    }

    console.log(`Found ${data.results.length} results from Google Places`);
    
    const vendors = data.results.map((place: GooglePlace) => {
      const vendor = {
        name: place.name,
        address: place.formatted_address,
        rating: place.rating,
        website: place.website,
        location: place.geometry?.location ? {
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng
        } : undefined,
        placeId: place.place_id
      };
      console.log('Processed vendor:', vendor);
      return vendor;
    });

    return vendors;
  } catch (error) {
    console.error('Error in fetchFromGooglePlaces:', error);
    return [];
  }
} 