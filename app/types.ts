export interface City {
  name: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
}

export interface Category {
  title: string;
  slug: string;
  description: string;
}

export interface Place {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number;
  reviews: number;
  photos: string[];
  category: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  place_id: string;
  last_updated: string;
} 