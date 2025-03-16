import mongoose from 'mongoose';

// Define types
export interface PlaceResult {
  id: string;
  displayName: {
    text: string;
    languageCode: string;
  };
  formattedAddress: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
}

export interface CacheEntry {
  query: string;
  city: string;
  category: string;
  places: PlaceResult[];
  timestamp: Date;
}

const placeSchema = new mongoose.Schema<CacheEntry>({
  query: { type: String, required: true },
  city: { type: String, required: true },
  category: { type: String, required: true },
  places: [{
    id: String,
    displayName: {
      text: String,
      languageCode: String
    },
    formattedAddress: String,
    websiteUri: String,
    rating: Number,
    userRatingCount: Number
  }],
  timestamp: { type: Date, default: Date.now }
});

// Create compound index for efficient querying
placeSchema.index({ query: 1, city: 1, category: 1 }, { unique: true });

// Create TTL index for automatic deletion after 180 days
placeSchema.index({ timestamp: 1 }, { expireAfterSeconds: 180 * 24 * 60 * 60 });

export const PlaceCache = mongoose.models.PlaceCache || mongoose.model<CacheEntry>('PlaceCache', placeSchema); 