'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchPlaces, convertPlaceToVendor } from '../lib/places';
import VendorCard from '../components/VendorCard';
import { Vendor } from '../data/vendors';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchParams) return;

    const query = searchParams.get('q');
    if (query) {
      handleSearch(query);
    }
  }, [searchParams]);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Searching for:', query);

      // Extract category and city from the search query
      const words = query.toLowerCase().split(' ');
      const cityIndex = words.findIndex(word => 
        ['in', 'at', 'near', 'around'].includes(word)
      );

      let category = '';
      let city = '';

      if (cityIndex !== -1) {
        category = words.slice(0, cityIndex).join(' ');
        city = words.slice(cityIndex + 1).join(' ');
      } else {
        // If no location specified, search in all major Florida cities
        category = query;
        city = 'Florida';
      }

      console.log('Extracted search params:', { category, city });

      const places = await searchPlaces(category, city);
      console.log('Found places:', places.length);

      const convertedVendors = places.map(place => convertPlaceToVendor(place, category, city));
      console.log('Converted vendors:', convertedVendors.length);

      setVendors(convertedVendors);
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to fetch vendors. Please try again.');
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Search Results</h1>
      
      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading vendors...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}

      {!loading && !error && vendors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No vendors found. Try searching with a location, e.g., "wedding photographers in Miami"</p>
        </div>
      )}
    </div>
  );
} 