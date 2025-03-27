import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

async function connectDB(): Promise<typeof mongoose> {
  if (isConnected) {
    return mongoose;
  }

  try {
    await mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
    });
    isConnected = true;
    return mongoose;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
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
    const mongoose = await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error('Database not connected');
    
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
    const mongoose = await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error('Database not connected');
    
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
    const mongoose = await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error('Database not connected');
    
    await db.command({ ping: 1 });
    return { isConnected: true };
  } catch (error) {
    console.error('Database connection error:', error);
    return { isConnected: false, error };
  }
} 