import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached = global as any;
cached.mongoose = cached.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.mongoose.conn) {
    return cached.mongoose.conn;
  }

  if (!cached.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.mongoose.conn = await cached.mongoose.promise;
  } catch (e) {
    cached.mongoose.promise = null;
    throw e;
  }

  return cached.mongoose.conn;
}

export async function getConnectionStatus() {
  if (!cached.mongoose.conn) {
    return { isConnected: false };
  }
  return { 
    isConnected: cached.mongoose.conn.readyState === 1,
    readyState: cached.mongoose.conn.readyState
  };
} 