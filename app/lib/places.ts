import { Client } from '@googlemaps/google-maps-services-js';
import { Place } from './models/Place';
import { connectDB } from './mongodb';

const client = new Client({});

const PLACE_DETAIL_FIELDS = [
  'formatted_phone_number',
  'website',
  'photos',
  'reviews',
  'rating',
  'user_ratings_total',
  'geometry',
  'formatted_address',
] as const;

type PlaceFields = typeof PLACE_DETAIL_FIELDS[number];

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

export async function searchPlaces(category: string, city: string): Promise<PlaceData[]> {
  try {
    console.log('Searching places with:', { category, city });
    
    // Connect to MongoDB
    await connectDB();
    
    // Check for cached results
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const cachedPlaces = await Place.find({
      category: category.toLowerCase(),
      city: city.toLowerCase(),
      last_updated: { $gte: sixMonthsAgo }
    });
    
    console.log(`Found ${cachedPlaces.length} cached places`);
    
    if (cachedPlaces.length > 0) {
      return cachedPlaces;
    }

    // If no cached results, search Google Places API
    const query = `${category} wedding vendor ${city} FL`;
    console.log('Searching Google Places API with query:', query);
    
    const response = await client.textSearch({
      params: {
        query,
        key: process.env.GOOGLE_PLACES_API_KEY!,
        region: 'us',
        type: 'establishment' as const,
      },
    });

    console.log('Google Places API response status:', response.status);
    
    if (response.status !== 200) {
      console.error('Google Places API error:', response.data);
      return [];
    }

    const places = response.data.results;
    console.log(`Found ${places.length} places from Google Places API`);

    // Get detailed information for each place
    const detailedPlaces: PlaceData[] = [];
    
    for (const place of places) {
      try {
        const details = await client.placeDetails({
          params: {
            place_id: place.place_id,
            fields: ['name', 'formatted_address', 'formatted_phone_number', 'website', 'rating', 'user_ratings_total', 'photos'],
            key: process.env.GOOGLE_PLACES_API_KEY!,
          },
        });

        const placeData: PlaceData = {
          place_id: place.place_id,
          name: place.name,
          address: place.formatted_address,
          phone: details.data.result.formatted_phone_number,
          website: details.data.result.website,
          rating: place.rating,
          reviews: place.user_ratings_total,
          photos: details.data.result.photos?.map(photo => 
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo.photo_reference}&key=${process.env.GOOGLE_PLACES_API_KEY}`
          ),
          category: category.toLowerCase(),
          city: city.toLowerCase(),
          state: 'florida',
          country: 'united states',
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
          last_updated: new Date(),
        };

        // Cache the place data
        await Place.findOneAndUpdate(
          { place_id: place.place_id },
          placeData,
          { upsert: true }
        );

        detailedPlaces.push(placeData);
      } catch (error) {
        console.error('Error getting place details:', error);
        continue;
      }
    }

    console.log(`Successfully processed ${detailedPlaces.length} places`);
    return detailedPlaces;
  } catch (error) {
    console.error('Error searching places:', error);
    return [];
  }
}

export async function getPlaceDetails(placeId: string): Promise<PlaceData | null> {
  const query = `place-${placeId}`;
  
  // Check cache first
  const cachedResult = await getCachedResults(query);
  if (cachedResult) {
    return cachedResult[0];
  }

  try {
    const response = await client.placeDetails({
      params: {
        place_id: placeId,
        fields: PLACE_DETAIL_FIELDS as PlaceFields[],
        key: process.env.GOOGLE_MAPS_API_KEY!,
      },
    });

    if (!response.data.result) {
      return null;
    }

    const result = response.data.result;
    const placeData: PlaceData = {
      place_id: placeId,
      name: result.name || '',
      address: result.formatted_address || '',
      phone: result.formatted_phone_number || '',
      website: result.website || '',
      rating: result.rating || 0,
      reviews: result.user_ratings_total || 0,
      photos: result.photos?.map(photo => photo.photo_reference) || [],
      category: '',  // These will be filled by the caller
      city: '',
      state: 'Florida',
      country: 'USA',
      lat: result.geometry?.location?.lat || 0,
      lng: result.geometry?.location?.lng || 0,
      last_updated: new Date(),
    };

    // Cache the result
    await cacheResults(query, [placeData]);

    return placeData;
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
} 