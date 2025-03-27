import { NextResponse } from 'next/server';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACES_API_URL = 'https://places.googleapis.com/v1/places:searchText';
const GOOGLE_PLACE_DETAILS_URL = 'https://places.googleapis.com/v1/places';

export async function POST(request: Request) {
  try {
    const { category, city, placeId } = await request.json();

    // Handle place details request
    if (placeId) {
      const response = await fetch(`${GOOGLE_PLACE_DETAILS_URL}/${placeId}`, {
        headers: {
          'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY || '',
          'X-Goog-FieldMask': 'id,displayName,formattedAddress,phoneNumber,websiteUri,rating,userRatingCount,location'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Place Details API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        return NextResponse.json(
          { error: 'Failed to fetch place details' },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);
    }

    // Handle search request
    if (!category || !city) {
      return NextResponse.json(
        { error: 'Category and city are required' },
        { status: 400 }
      );
    }

    const response = await fetch(GOOGLE_PLACES_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY || '',
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.phoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.location'
      },
      body: JSON.stringify({
        textQuery: `${category} in ${city}, Florida`,
        pageSize: 20
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Search API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      return NextResponse.json(
        { error: 'Failed to fetch places' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in places API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 