import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, default: '' },
  website: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  category: { type: String, required: true },
  city: { type: String, required: true },
  businessStatus: { type: String, default: 'OPERATIONAL' },
  openingHours: {
    periods: [{
      open: {
        day: Number,
        time: String
      },
      close: {
        day: Number,
        time: String
      }
    }]
  },
  priceLevel: Number,
  types: [String],
  last_updated: { type: Date, default: Date.now },
});

// Add index for efficient queries
placeSchema.index({ category: 1, city: 1 });
placeSchema.index({ last_updated: 1 });

// Check if model exists before creating
export const Place = mongoose.models.Place || mongoose.model('Place', placeSchema); 