import { MongoClient, ObjectId } from 'mongodb';
import { PlaceData } from '../types/places';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
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

export interface CachedVendor {
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

export async function getCachedResults(category: string, city: string): Promise<PlaceData[]> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<CachedVendor>('vendors');

    const query = {
      category: category.toLowerCase(),
      city: city.toLowerCase(),
      lastUpdated: { $gt: new Date(Date.now() - 15778800000) } // 6 months
    };

    console.log('MongoDB query:', query);

    const vendors = await collection.find(query).toArray();
    console.log('Found vendors in MongoDB:', vendors.length);

    return vendors.map(vendor => ({
      id: vendor.placeId || vendor._id || '',
      name: vendor.name,
      address: vendor.address,
      phone: vendor.phone || '',
      website: vendor.website || '',
      rating: vendor.rating || 0,
      reviews: vendor.reviews || 0,
      photos: [], // We don't cache photos
      location: vendor.location ? {
        lat: vendor.location.latitude,
        lng: vendor.location.longitude
      } : { lat: 0, lng: 0 },
      category: vendor.category || '',
      city: vendor.city
    }));
  } catch (error) {
    console.error('MongoDB error:', error);
    return [];
  }
}

export async function cacheResults(places: PlaceData[]): Promise<void> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<CachedVendor>('vendors');

    const vendors = places.map(place => ({
      placeId: place.id,
      name: place.name,
      address: place.address,
      phone: place.phone,
      website: place.website,
      rating: place.rating,
      reviews: place.reviews,
      location: place.location ? {
        latitude: place.location.lat,
        longitude: place.location.lng
      } : undefined,
      category: place.category.toLowerCase(),
      city: place.city.toLowerCase(),
      lastUpdated: new Date()
    }));

    console.log('Inserting new vendors into MongoDB:', vendors.length);

    // Use upsert to update existing vendors or insert new ones
    await Promise.all(vendors.map(vendor => 
      collection.updateOne(
        { placeId: vendor.placeId },
        { $set: vendor },
        { upsert: true }
      )
    ));
  } catch (error) {
    console.error('Error caching results:', error);
  }
}

export default clientPromise; 