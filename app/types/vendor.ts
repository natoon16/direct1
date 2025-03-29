export interface Vendor {
  id: string;
  name: string;
  category: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  reviewCount: number;
  businessStatus: 'OPERATIONAL' | 'CLOSED_TEMPORARILY' | 'CLOSED_PERMANENTLY';
  placeId: string;
  description: string;
  reviews: number;
  location: {
    lat: number;
    lng: number;
  };
  createdAt?: Date;
  expiresAt?: Date;
} 