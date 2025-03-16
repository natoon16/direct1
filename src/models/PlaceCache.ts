import mongoose from 'mongoose';
import type { CacheEntry } from '@/types/places';

const placeSchema = new mongoose.Schema<CacheEntry>({
  query: { type: String, required: true },
  city: { type: String, required: true },
  category: { type: String, required: true },
  results: [{
    displayName: {
      text: { type: String, required: true },
      languageCode: { type: String, required: true }
    },
    formattedAddress: { type: String, required: true },
    websiteUri: { type: String },
    rating: { type: Number },
    userRatingCount: { type: Number },
    priceLevel: { type: String },
    types: [{ type: String }],
    photos: [{
      name: { type: String }
    }]
  }],
  lastUpdated: { type: Date, required: true, default: Date.now }
});

// Create compound index for efficient querying
placeSchema.index({ query: 1, city: 1, category: 1 });

// Create TTL index for automatic deletion after 6 months
placeSchema.index({ lastUpdated: 1 }, { expireAfterSeconds: 6 * 30 * 24 * 60 * 60 });

export const PlaceCache = mongoose.models.PlaceCache || mongoose.model<CacheEntry>('PlaceCache', placeSchema); 