export interface Place {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number;
  reviews: number;
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

export interface PlaceData {
  id: string;
  name: string;
  address: string;
  reviews: number;
  businessStatus?: string;
  rating?: number;
  reviewCount?: number;
  phone?: string;
  email?: string;
  website?: string;
  placeId: string;
} 