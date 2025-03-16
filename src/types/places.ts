export interface PlaceResult {
  id: string;
  displayName: {
    text: string;
    languageCode: string;
  };
  formattedAddress: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  priceLevel?: string;
  types?: string[];
  photos?: Array<{
    name: string;
    uri: string;
  }>;
}

export interface CacheEntry {
  query: string;
  city: string;
  category: string;
  results: PlaceResult[];
  lastUpdated: Date;
} 