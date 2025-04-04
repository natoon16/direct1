export interface PlaceData {
  id: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  businessStatus?: string;
  email?: string;
  placeId: string;
  location?: {
    lat: number;
    lng: number;
  };
} 