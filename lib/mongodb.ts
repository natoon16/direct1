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
  minPoolSize: 5,
  directConnection: false,
  replicaSet: 'atlas-ltq4a2-shard-0',
  ssl: true
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
    let vendors: Vendor[] = [];

    try {
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
      
      const findPromise: Promise<Vendor[]> = collection.find(query).toArray();
      const timeoutPromise = new Promise<Vendor[]>((_, reject) => 
        setTimeout(() => reject(new Error('MongoDB query timeout')), 5000)
      );
      
      vendors = await Promise.race([findPromise, timeoutPromise]);
      console.log('Found vendors in MongoDB:', vendors.length);
    } catch (mongoError) {
      console.error('MongoDB error:', mongoError);
      // Continue to Google Places API if MongoDB fails
    }

    if (vendors.length === 0) {
      console.log('No vendors found in cache, fetching from Google Places...');
      const newVendors = await fetchFromGooglePlaces(city, category);
      console.log('Fetched vendors from Google Places:', newVendors.length);
      
      if (newVendors.length > 0) {
        try {
          const client = await clientPromise;
          const db = client.db("weddingDirectory");
          const collection = db.collection<Vendor>("vendors");

          console.log('Inserting new vendors into MongoDB:', newVendors.length);
          await collection.insertMany(newVendors).catch(err => {
            console.error('Error inserting vendors:', err);
          });
        } catch (insertError) {
          console.error('Error accessing MongoDB for insert:', insertError);
        }
        return newVendors;
      }
    }

    return vendors;
  } catch (error) {
    console.error('Error in getVendors:', error);
    return [];
  }
});

async function fetchFromGooglePlaces(city: string, category?: string): Promise<Vendor[]> {
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    throw new Error('Google Places API key is missing');
  }

  try {
    // Construct search queries based on category
    const queries = [];
    if (category) {
      // More specific queries for better results
      queries.push(
        `${category} wedding vendors near ${city}, Florida`,
        `best ${category} wedding services ${city}, FL`,
        `top rated wedding ${category} in ${city}, Florida`
      );
    } else {
      queries.push(
        `wedding vendors near ${city}, Florida`,
        `wedding services ${city}, FL`,
        `wedding businesses in ${city}, Florida`
      );
    }

    let allVendors: Vendor[] = [];
    
    // Try each query until we find results
    for (const searchQuery of queries) {
      console.log('Trying Google Places search query:', searchQuery);
      
      const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.websiteUri,places.location'
        },
        body: JSON.stringify({
          textQuery: searchQuery,
          languageCode: "en",
          maxResultCount: 20,
          locationRestriction: {
            rectangle: {
              low: { latitude: 24.396308, longitude: -87.634896 }, // SW Florida
              high: { latitude: 31.000888, longitude: -79.974306 }  // NE Florida
            }
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Google Places API error:', errorText);
        console.error('Failed query:', searchQuery);
        continue;
      }

      const data = await response.json();
      console.log('Places API Response:', JSON.stringify(data, null, 2));
      
      if (data.places && Array.isArray(data.places)) {
        const vendors = data.places
          .filter((place: any) => {
            // Basic validation of required fields
            return place.displayName?.text && place.formattedAddress;
          })
          .map((place: any) => ({
            name: place.displayName.text,
            address: place.formattedAddress,
            rating: place.rating?.value,
            website: place.websiteUri,
            location: place.location ? {
              latitude: place.location.latitude,
              longitude: place.location.longitude
            } : undefined,
            placeId: place.id,
            city: city.toLowerCase(),
            category: category?.toLowerCase(),
            lastUpdated: new Date()
          }));

        if (vendors.length > 0) {
          allVendors = [...allVendors, ...vendors];
          console.log(`Found ${vendors.length} vendors with query: ${searchQuery}`);
          break; // Stop if we found results
        }
      }
    }

    // Remove duplicates based on placeId
    const uniqueVendors = Array.from(new Map(allVendors.map(v => [v.placeId, v])).values());
    console.log(`Returning ${uniqueVendors.length} unique vendors`);
    return uniqueVendors;
  } catch (error) {
    console.error('Error in fetchFromGooglePlaces:', error);
    console.error('Error details:', error instanceof Error ? error.message : error);
    return [];
  }
} 