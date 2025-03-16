import { connectToDatabase } from './mongodb';
import { PlaceCache, PlaceResult } from '../models/PlaceCache';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

if (!GOOGLE_PLACES_API_KEY) {
  throw new Error('GOOGLE_PLACES_API_KEY is not defined');
}

// Cache configuration
const CACHE_CONFIG = {
  HTTP_REVALIDATE: 60 * 60 * 24, // 24 hours
  MEMORY_TTL: 60 * 60 * 1000, // 1 hour in milliseconds
  BATCH_SIZE: 20
};

// In-memory cache
const memoryCache = new Map<string, { data: PlaceResult[]; timestamp: number }>();

// Clean up memory cache periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of memoryCache.entries()) {
    if (now - value.timestamp > CACHE_CONFIG.MEMORY_TTL) {
      memoryCache.delete(key);
    }
  }
}, CACHE_CONFIG.MEMORY_TTL);

// Helper function for retrying failed requests
async function retryFetch(url: string, options: RequestInit, maxRetries = 3): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
      }
      return response;
    } catch (error) {
      lastError = error as Error;
      if (i === maxRetries - 1) break;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
  
  throw lastError;
}

export async function searchPlaces(query: string, city: string, category: string): Promise<{ places: PlaceResult[] }> {
  try {
    await connectToDatabase();

    // Check memory cache first
    const cacheKey = `${query}-${city}-${category}`;
    const memoryCached = memoryCache.get(cacheKey);
    if (memoryCached && Date.now() - memoryCached.timestamp < CACHE_CONFIG.MEMORY_TTL) {
      return { places: memoryCached.data };
    }

    // Check MongoDB cache
    const cached = await PlaceCache.findOne({ query, city, category });
    if (cached) {
      // Update memory cache
      memoryCache.set(cacheKey, {
        data: cached.places,
        timestamp: Date.now()
      });
      return { places: cached.places };
    }

    // Construct search query
    const searchQuery = `wedding ${category.toLowerCase()} in ${city}, Florida`;

    // Call Places API
    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY!,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.websiteUri,places.rating,places.userRatingCount'
    } as const;

    const requestBody = {
      textQuery: searchQuery,
      languageCode: 'en',
      regionCode: 'US',
      locationBias: {
        circle: {
          center: {
            latitude: 27.6648,  // Approximate center of Florida
            longitude: -81.5158
          },
          radius: 25000.0  // 25km radius - well within the allowed range
        }
      },
      rankPreference: 'RELEVANCE',
      pageSize: 20,
      strictTypeFiltering: false
    };

    const response = await retryFetch(
      'https://places.googleapis.com/v1/places:searchText',
      {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
      }
    );

    const data = await response.json();
    
    // Filter results to ensure they are in the correct city
    const results = (data.places || []).filter((place: any) => {
      const address = place.formattedAddress?.toLowerCase() || '';
      const cityName = city.toLowerCase();
      const cityNoSpace = cityName.replace(/\s+/g, '');
      
      // More precise city matching
      return address.includes(`, ${cityName}, fl`) || 
             address.includes(`, ${cityNoSpace}, fl`) ||
             address.includes(`, ${cityName}, florida`) ||
             address.includes(`, ${cityNoSpace}, florida`);
    });

    if (results.length === 0) {
      // Try a broader search with a different approach
      const broadRequestBody = {
        textQuery: `wedding ${category.toLowerCase()} in ${city}, FL`,
        languageCode: 'en',
        regionCode: 'US',
        rankPreference: 'RELEVANCE',
        pageSize: 30,
        strictTypeFiltering: false,
        locationBias: {
          circle: {
            center: {
              latitude: 27.6648,
              longitude: -81.5158
            },
            radius: 45000.0  // Broader 45km radius for second attempt
          }
        }
      };

      const broadResponse = await retryFetch(
        'https://places.googleapis.com/v1/places:searchText',
        {
          method: 'POST',
          headers,
          body: JSON.stringify(broadRequestBody)
        }
      );

      const broadData = await broadResponse.json();
      const broadResults = broadData.places || [];

      // Cache the results
      await PlaceCache.findOneAndUpdate(
        { query, city, category },
        {
          $set: {
            places: broadResults,
            timestamp: new Date()
          }
        },
        { upsert: true }
      );

      // Update memory cache
      memoryCache.set(cacheKey, {
        data: broadResults,
        timestamp: Date.now()
      });

      return { places: broadResults };
    }

    // Cache the results
    await PlaceCache.findOneAndUpdate(
      { query, city, category },
      {
        $set: {
          places: results,
          timestamp: new Date()
        }
      },
      { upsert: true }
    );

    // Update memory cache
    memoryCache.set(cacheKey, {
      data: results,
      timestamp: Date.now()
    });

    return { places: results };
  } catch (error) {
    console.error('Error in searchPlaces:', error);
    throw error;
  }
} 