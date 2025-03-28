export interface PlaceData {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviews: number;
  photos: string[];
  website?: string;
  phone?: string;
  location: {
    lat: number;
    lng: number;
  };
  category: string;
  city: string;
} 