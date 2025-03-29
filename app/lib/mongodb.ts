import { MongoClient, ObjectId } from 'mongodb';
import { PlaceData } from '../types/places';
import { Place } from '../types/place';

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

const SIX_MONTHS = 15778800000; // 6 months in milliseconds

interface CachedResult {
  _id?: string;
  category: string;
  city: string;
  places: Place[];
  createdAt: Date;
  updatedAt: Date;
}

export async function getCachedResults(category: string, city: string): Promise<Place[] | null> {
  try {
    const client = await clientPromise;
    const db = client.db('weddingdirectory');
    const collection = db.collection('cached_results');

    const result = await collection.findOne({
      category,
      city,
      updatedAt: { $gt: new Date(Date.now() - SIX_MONTHS) },
    });

    if (result) {
      console.log('Found cached results for:', category, city);
      return result.places;
    }

    return null;
  } catch (error) {
    console.error('Error getting cached results:', error);
    return null;
  }
}

export async function cacheResults(places: Place[], category: string, city: string): Promise<void> {
  try {
    const client = await clientPromise;
    const db = client.db('weddingdirectory');
    const collection = db.collection('cached_results');

    const now = new Date();
    const cacheData: CachedResult = {
      category,
      city,
      places,
      createdAt: now,
      updatedAt: now,
    };

    await collection.updateOne(
      { category, city },
      { $set: cacheData },
      { upsert: true }
    );

    console.log('Cached results for:', category, city);
  } catch (error) {
    console.error('Error caching results:', error);
  }
}

export default clientPromise; 