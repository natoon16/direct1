'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchPlaces, convertPlaceToVendor } from '../lib/places';
import VendorCard from '../components/VendorCard';
import { Vendor } from '../types/vendor';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVendors() {
      try {
        setLoading(true);
        setError(null);

        if (!searchParams) {
          setError('Search parameters not available');
          return;
        }

        const category = searchParams.get('category');
        const city = searchParams.get('city');

        if (!category || !city) {
          setError('Please select both category and city');
          return;
        }

        console.log('Searching for:', { category, city });
        const places = await searchPlaces(category, city);
        console.log('Found places:', places.length);

        setVendors(places);
      } catch (err) {
        console.error('Error fetching vendors:', err);
        setError('Failed to load vendors. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchVendors();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Loading vendors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (vendors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No vendors found. Try different search criteria.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
} 