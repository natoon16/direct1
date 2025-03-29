export interface Place {
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
  businessStatus: string;
  openingHours?: {
    periods: Array<{
      open: { day: number; time: string };
      close?: { day: number; time: string };
    }>;
  };
  priceLevel?: number;
  types?: string[];
} 