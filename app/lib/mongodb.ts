import mongoose from 'mongoose';
import { PlaceData } from './types';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

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

// Define the Place schema
const PlaceSchema = new mongoose.Schema({
  id: String,
  name: String,
  address: String,
  phone: String,
  website: String,
  rating: Number,
  reviews: Number,
  category: String,
  city: String,
  state: String,
  country: String,
  lat: Number,
  lng: Number,
  last_updated: Date
});

// Create the Place model
const Place = mongoose.models.Place || mongoose.model('Place', PlaceSchema);

export async function cacheResults(query: string, results: PlaceData[]) {
  await connectDB();
  
  for (const place of results) {
    await Place.findOneAndUpdate(
      { id: place.id },
      place,
      { upsert: true }
    );
  }
}

export async function getCachedResults(query: string): Promise<PlaceData[]> {
  await connectDB();
  
  const places = await Place.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { category: { $regex: query, $options: 'i' } },
      { city: { $regex: query, $options: 'i' } }
    ]
  });

  return places.map(place => ({
    id: place.id,
    name: place.name,
    address: place.address,
    phone: place.phone,
    website: place.website,
    rating: place.rating,
    reviews: place.reviews,
    category: place.category,
    city: place.city,
    state: place.state,
    country: place.country,
    lat: place.lat,
    lng: place.lng,
    last_updated: place.last_updated
  }));
}

export default connectDB; 