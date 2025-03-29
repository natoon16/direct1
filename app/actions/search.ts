'use server';

import { searchPlaces } from '../lib/places';

export async function searchVendors(category: string, city: string) {
  try {
    const places = await searchPlaces(category, city);
    return { success: true, data: places };
  } catch (error) {
    console.error('Error searching vendors:', error);
    return { success: false, error: 'Failed to search vendors' };
  }
} 