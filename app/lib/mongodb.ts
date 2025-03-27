import mongoose from 'mongoose';
import { Place } from './models/Place';
import { PlaceData } from './types';

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

// Cache duration in milliseconds (6 months)
export const CACHE_DURATION = 6 * 30 * 24 * 60 * 60 * 1000;

export interface CacheEntry {
  query: string;
  results: any[];
  timestamp: number;
}

export async function getCachedResults(query: string): Promise<PlaceData[]> {
  try {
    await connectDB();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const places = await Place.find({
      $or: [
        { category: query.toLowerCase() },
        { city: query.toLowerCase() }
      ],
      last_updated: { $gte: sixMonthsAgo }
    });
    
    return places;
  } catch (error) {
    console.error('Error getting cached results:', error);
    return [];
  }
}

export async function cacheResults(query: string, place: PlaceData): Promise<void> {
  try {
    await connectDB();
    await Place.findOneAndUpdate(
      { place_id: place.place_id },
      place,
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

export default connectDB; 