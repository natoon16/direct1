import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;

// Cache duration in milliseconds (6 months)
export const CACHE_DURATION = 6 * 30 * 24 * 60 * 60 * 1000;

export interface CacheEntry {
  query: string;
  results: any[];
  timestamp: number;
}

export async function getCachedResults(query: string) {
  try {
    const client = await connectDB();
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
    const client = await connectDB();
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
    const client = await connectDB();
    await client.db('wedding-directory').command({ ping: 1 });
    return { isConnected: true };
  } catch (error) {
    console.error('Database connection error:', error);
    return { isConnected: false, error };
  }
} 