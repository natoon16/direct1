import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

const SIX_MONTHS = 15778800000; // 6 months in milliseconds

interface CachedVendor {
  _id?: string;
  placeId?: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: number;
  location?: {
    latitude: number;
    longitude: number;
  };
  category?: string;
  city: string;
  lastUpdated: Date;
}

export async function POST(request: Request) {
  try {
    const { category, city } = await request.json();

    if (!category || !city) {
      return NextResponse.json(
        { error: 'Category and city are required' },
        { status: 400 }
      );
    }

    // First, try to get from MongoDB cache
    const client = await clientPromise;
    const db = client.db("weddingDirectory");
    const collection = db.collection<CachedVendor>("vendors");

    const query = {
      city: city.toLowerCase(),
      category: category.toLowerCase(),
      lastUpdated: { $gt: new Date(Date.now() - SIX_MONTHS) }
    };

    console.log('MongoDB query:', query);
    const cachedVendors = await collection.find(query).toArray();
    console.log('Found cached vendors:', cachedVendors.length);

    if (cachedVendors.length > 0) {
      return NextResponse.json({
        places: cachedVendors.map(vendor => ({
          id: vendor.placeId || vendor._id?.toString() || '',
          displayName: { text: vendor.name },
          formattedAddress: vendor.address,
          phoneNumber: vendor.phone,
          websiteUri: vendor.website,
          rating: vendor.rating,
          userRatingCount: vendor.reviews,
          location: vendor.location ? {
            latitude: vendor.location.latitude,
            longitude: vendor.location.longitude
          } : null
        }))
      });
    }

    // If no cached results, fetch from Google Places API
    console.log('No cached results, fetching from Google Places API');
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY || '',
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.phoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.location'
      },
      body: JSON.stringify({
        textQuery: `${category} in ${city}, Florida`,
        pageSize: 20
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Google Places API Error:', {
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
    console.log('Google Places API Response:', data);

    if (!data.places || !Array.isArray(data.places)) {
      console.error('Invalid API response format:', data);
      return NextResponse.json({ places: [] });
    }

    // Cache the results in MongoDB
    if (data.places.length > 0) {
      try {
        const vendorsToCache = data.places.map((place: any) => ({
          placeId: place.id,
          name: place.displayName?.text || '',
          address: place.formattedAddress || '',
          phone: place.phoneNumber || '',
          website: place.websiteUri || '',
          rating: place.rating || 0,
          reviews: place.userRatingCount || 0,
          location: place.location ? {
            latitude: place.location.latitude,
            longitude: place.location.longitude
          } : null,
          category: category.toLowerCase(),
          city: city.toLowerCase(),
          lastUpdated: new Date()
        }));

        await collection.insertMany(vendorsToCache);
        console.log('Cached new vendors in MongoDB:', vendorsToCache.length);
      } catch (error) {
        console.error('Error caching vendors:', error);
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in search API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 