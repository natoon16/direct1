import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client;
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

// Cache duration in milliseconds (6 months)
export const CACHE_DURATION = 6 * 30 * 24 * 60 * 60 * 1000;

export interface CacheEntry {
  query: string;
  results: any[];
  timestamp: number;
}

export async function getCachedResults(query: string) {
  try {
    const client = await clientPromise;
    const db = client.db('wedding-directory');
    const cache = db.collection('search-cache');

    const entry = await cache.findOne({ query });
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > CACHE_DURATION) {
      await cache.deleteOne({ query });
      return null;
    }

    return entry.results;
  } catch (error) {
    console.error('Error getting cached results:', error);
    return null;
  }
}

export async function cacheResults(query: string, results: any[]) {
  try {
    const client = await clientPromise;
    const db = client.db('wedding-directory');
    const cache = db.collection('search-cache');

    await cache.updateOne(
      { query },
      {
        $set: {
          results,
          timestamp: Date.now(),
        },
      },
      { upsert: true }
    );
  } catch (error) {
    console.error('Error caching results:', error);
  }
}

// Function to check database connection
export async function checkConnection() {
  try {
    const client = await clientPromise;
    await client.db('wedding-directory').command({ ping: 1 });
    return { isConnected: true };
  } catch (error) {
    console.error('Database connection error:', error);
    return { isConnected: false, error };
  }
} 