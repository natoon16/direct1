'use server';

import { searchPlaces } from '../lib/places';

export async function searchVendors(category: string, city: string) {
  try {
    console.log(`Server action: Searching for ${category} in ${city}`);
    
    if (!category || !city) {
      console.error('Missing required parameters:', { category, city });
      return { 
        success: false, 
        error: 'Category and city are required for search' 
      };
    }

    const places = await searchPlaces(category, city);
    
    console.log(`Server action: Found ${places.length} places`);
    
    return { 
      success: true, 
      data: places 
    };
  } catch (error) {
    console.error('Error in searchVendors action:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to search vendors' 
    };
  }
} 