export interface PlaceData {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number;
  reviews: number;
  location: {
    lat: number;
    lng: number;
  };
  category: string;
  city: string;
} 