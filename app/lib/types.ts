export interface PlaceData {
  id: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: number;
  category?: string;
  city?: string;
  state?: string;
  country?: string;
  lat?: number;
  lng?: number;
  last_updated?: Date;
} 