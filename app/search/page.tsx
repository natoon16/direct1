'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchPlaces, convertPlaceToVendor } from '../lib/places';
import { PlaceData } from '../lib/types';
import { Vendor } from '../data/vendors';
import VendorCard from '../components/VendorCard';
import SearchForm from '../components/SearchForm';

function SearchContent() {
  const searchParams = useSearchParams();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchParams) return;

    const category = searchParams.get('category');
    const city = searchParams.get('city');

    if (category && city) {
      handleSearch(category, city);
    }
  }, [searchParams]);

  const handleSearch = async (category: string, city: string) => {
    setLoading(true);
    setError(null);

    try {
      const places = await searchPlaces(category, city);
      const convertedVendors = places.map(place => convertPlaceToVendor(place, category, city));
      setVendors(convertedVendors);
    } catch (err) {
      setError('Failed to fetch vendors. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Wedding Vendors</h1>
      
      <SearchForm onSearch={handleSearch} />

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {!loading && !error && vendors.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          No vendors found. Try adjusting your search criteria.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
} 