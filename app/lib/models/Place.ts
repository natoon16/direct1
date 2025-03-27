import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  place_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: String,
  website: String,
  rating: Number,
  reviews: Number,
  photos: [String],
  category: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  last_updated: { type: Date, default: Date.now },
});

// Add index for efficient queries
placeSchema.index({ category: 1, city: 1 });
placeSchema.index({ last_updated: 1 });

// Check if model exists before creating
export const Place = mongoose.models.Place || mongoose.model('Place', placeSchema); 