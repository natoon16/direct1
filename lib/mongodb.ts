import { MongoClient, Document, MongoClientOptions } from 'mongodb';
import { cache } from 'react';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
  connectTimeoutMS: 10000,
  socketTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
  retryWrites: true,
  retryReads: true,
  maxPoolSize: 10,
  minPoolSize: 5
};

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
    const client = await Promise.race([
      clientPromise,
      new Promise<MongoClient>((_, reject) => 
        setTimeout(() => reject(new Error('MongoDB connection timeout')), 5000)
      )
    ]);

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
    
    // Add timeout to the find operation
    const findPromise: Promise<Vendor[]> = collection.find(query).toArray();
    const timeoutPromise = new Promise<Vendor[]>((_, reject) => 
      setTimeout(() => reject(new Error('MongoDB query timeout')), 5000)
    );
    
    const vendors = await Promise.race([findPromise, timeoutPromise]);
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
        
        try {
          console.log('Inserting new vendors into MongoDB:', vendorsToInsert.length);
          const insertPromise = collection.insertMany(vendorsToInsert);
          const insertTimeoutPromise = new Promise<any>((_, reject) => 
            setTimeout(() => reject(new Error('MongoDB insert timeout')), 5000)
          );
          
          await Promise.race([insertPromise, insertTimeoutPromise]);
          return vendorsToInsert;
        } catch (insertError) {
          console.error('Error inserting vendors:', insertError);
          return newVendors; // Return the vendors even if we couldn't cache them
        }
      }
    }

    return vendors;
  } catch (error) {
    console.error('Error in getVendors:', error);
    // If MongoDB fails, try to get vendors directly from Google Places
    try {
      console.log('MongoDB failed, falling back to Google Places...');
      return await fetchFromGooglePlaces(city, category);
    } catch (fallbackError) {
      console.error('Fallback to Google Places failed:', fallbackError);
      return [];
    }
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
    
    const url = 'https://places.googleapis.com/v1/places:searchText';
    console.log('Using new Google Places API endpoint');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.rating,places.websiteUri,places.location,places.id'
      },
      body: JSON.stringify({
        textQuery: searchQuery
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Places API error response:', errorText);
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Raw API response:', JSON.stringify(data, null, 2));
    
    if (!data.places || !Array.isArray(data.places)) {
      console.error('Unexpected API response format:', data);
      return [];
    }

    console.log(`Found ${data.places.length} results from Google Places`);
    
    const vendors = data.places.map((place: any) => {
      const vendor = {
        name: place.displayName?.text || place.displayName,
        address: place.formattedAddress,
        rating: place.rating,
        website: place.websiteUri,
        location: place.location ? {
          latitude: place.location.latitude,
          longitude: place.location.longitude
        } : undefined,
        placeId: place.id
      };
      console.log('Processed vendor:', vendor);
      return vendor;
    });

    return vendors;
  } catch (error) {
    console.error('Error in fetchFromGooglePlaces:', error);
    console.error('Error details:', error instanceof Error ? error.message : error);
    return [];
  }
} 