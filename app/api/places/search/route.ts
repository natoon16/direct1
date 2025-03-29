import { NextResponse } from 'next/server';
import { getCachedResults, cacheResults } from '../../../lib/mongodb';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACES_API_URL = 'https://places.googleapis.com/v1/places:searchText';

// Valid categories for wedding vendors
const VALID_CATEGORIES = [
  'photographers',
  'venues',
  'catering',
  'florists',
  'djs',
  'bands',
  'planners',
  'officiants',
  'transportation',
  'decorators',
  'videographers',
  'bakeries',
  'rentals',
  'hair',
  'makeup',
  'invitations',
  'favors',
  'jewelry',
  'dresses',
  'suits'
];

// Valid cities in Florida
const VALID_CITIES = [
  'miami',
  'orlando',
  'tampa',
  'jacksonville',
  'fort lauderdale',
  'west palm beach',
  'sarasota',
  'naples',
  'fort myers',
  'st. petersburg',
  'clearwater',
  'boca raton',
  'palm beach',
  'key west',
  'destin',
  'panama city',
  'daytona beach',
  'melbourne',
  'gainesville',
  'tallahassee'
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, city } = body;

    // Validate input
    if (!category || !city) {
      console.error('Missing required parameters:', { category, city });
      return NextResponse.json(
        { error: 'Category and city are required' },
        { status: 400 }
      );
    }

    // Normalize and validate category
    const normalizedCategory = category.toLowerCase().trim();
    if (!VALID_CATEGORIES.includes(normalizedCategory)) {
      console.error('Invalid category:', normalizedCategory);
      return NextResponse.json(
        { error: 'Invalid category. Please select from our predefined categories.' },
        { status: 400 }
      );
    }

    // Normalize and validate city
    const normalizedCity = city.toLowerCase().trim();
    if (!VALID_CITIES.includes(normalizedCity)) {
      console.error('Invalid city:', normalizedCity);
      return NextResponse.json(
        { error: 'Invalid city. Please select from our predefined cities.' },
        { status: 400 }
      );
    }

    console.log('Search request:', { category: normalizedCategory, city: normalizedCity });

    // Try to get from cache first
    const cachedResults = await getCachedResults(normalizedCategory, normalizedCity);
    if (cachedResults && cachedResults.length > 0) {
      console.log('Returning cached results:', cachedResults.length);
      return NextResponse.json({ places: cachedResults });
    }

    // If not in cache, fetch from Google Places API
    if (!GOOGLE_PLACES_API_KEY) {
      console.error('Google Places API key is not configured');
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    // First try with a more specific wedding vendor search
    const searchQuery = `${normalizedCategory} wedding services in ${normalizedCity}, Florida`;
    console.log('Searching with query:', searchQuery);

    const response = await fetch(GOOGLE_PLACES_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.websiteUri,places.phoneNumber,places.location',
      },
      body: JSON.stringify({
        textQuery: searchQuery,
        locationBias: {
          circle: {
            center: {
              latitude: 27.6648, // Florida's approximate center
              longitude: -81.5158,
            },
            radius: 500000, // 500km radius to cover Florida
          },
        },
        type: 'establishment',
      }),
    });

    if (!response.ok) {
      console.error('Places API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch places' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Places API response:', data);

    if (!data.places || !Array.isArray(data.places)) {
      console.error('Invalid API response format:', data);
      return NextResponse.json({ places: [] });
    }

    // If no results, try a broader search
    if (data.places.length === 0) {
      const broaderQuery = `${normalizedCategory} in ${normalizedCity}, Florida`;
      console.log('Trying broader search with query:', broaderQuery);

      const broaderResponse = await fetch(GOOGLE_PLACES_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.websiteUri,places.phoneNumber,places.location',
        },
        body: JSON.stringify({
          textQuery: broaderQuery,
          locationBias: {
            circle: {
              center: {
                latitude: 27.6648,
                longitude: -81.5158,
              },
              radius: 500000,
            },
          },
          type: 'establishment',
        }),
      });

      if (!broaderResponse.ok) {
        console.error('Broader search API error:', broaderResponse.status, broaderResponse.statusText);
        return NextResponse.json({ places: [] });
      }

      const broaderData = await broaderResponse.json();
      console.log('Broader search response:', broaderData);

      if (!broaderData.places || !Array.isArray(broaderData.places)) {
        return NextResponse.json({ places: [] });
      }

      const places = broaderData.places.map((place: any) => ({
        id: place.id,
        name: place.displayName?.text || '',
        address: place.formattedAddress || '',
        rating: place.rating || 0,
        reviews: place.userRatingCount || 0,
        website: place.websiteUri || '',
        phone: place.phoneNumber || '',
        location: {
          lat: place.location?.latitude || 0,
          lng: place.location?.longitude || 0,
        },
        category: normalizedCategory,
        city: normalizedCity,
      }));

      // Cache the results
      await cacheResults(places);
      return NextResponse.json({ places });
    }

    const places = data.places.map((place: any) => ({
      id: place.id,
      name: place.displayName?.text || '',
      address: place.formattedAddress || '',
      rating: place.rating || 0,
      reviews: place.userRatingCount || 0,
      website: place.websiteUri || '',
      phone: place.phoneNumber || '',
      location: {
        lat: place.location?.latitude || 0,
        lng: place.location?.longitude || 0,
      },
      category: normalizedCategory,
      city: normalizedCity,
    }));

    // Cache the results
    await cacheResults(places);
    return NextResponse.json({ places });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 