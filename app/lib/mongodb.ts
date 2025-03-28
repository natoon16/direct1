import { MongoClient, ObjectId } from 'mongodb';
import { PlaceData } from '../types/places';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

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

export async function getCachedResults(category: string, city: string): Promise<PlaceData[]> {
  const client = await clientPromise;
  const db = client.db('wedding-directory');
  const collection = db.collection('places');

  const places = await collection.find({
    category,
    city,
    last_updated: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24 hours
  }).toArray();

  return places.map(place => ({
    id: place.id,
    name: place.name,
    address: place.address,
    rating: place.rating,
    reviews: place.reviews,
    photos: place.photos || [],
    website: place.website,
    phone: place.phone,
    location: {
      lat: place.lat,
      lng: place.lng
    },
    category: place.category,
    city: place.city
  }));
}

export async function cacheResults(places: PlaceData[]): Promise<void> {
  const client = await clientPromise;
  const db = client.db('wedding-directory');
  const collection = db.collection('places');

  const operations = places.map(place => ({
    updateOne: {
      filter: { id: place.id },
      update: {
        $set: {
          ...place,
          last_updated: new Date()
        }
      },
      upsert: true
    }
  }));

  if (operations.length > 0) {
    await collection.bulkWrite(operations);
  }
} 