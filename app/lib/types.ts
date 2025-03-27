export interface PlaceData {
  place_id: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: number;
  photos?: string[];
  category: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  last_updated: Date;
} 