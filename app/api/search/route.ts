import { NextResponse } from 'next/server';
import { searchPlaces } from '@/app/lib/places';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const city = searchParams.get('city');

  if (!category || !city) {
    return NextResponse.json(
      { error: 'Category and city are required' },
      { status: 400 }
    );
  }

  try {
    const places = await searchPlaces(category, city);
    return NextResponse.json({ places });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search places' },
      { status: 500 }
    );
  }
} 