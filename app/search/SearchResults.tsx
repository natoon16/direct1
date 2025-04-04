'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchVendors } from '../actions/search';
import { Vendor } from '../types/vendor';
import { categories } from '../data/categories';
import { cities } from '../data/cities';
import VendorCard from '../components/VendorCard';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      if (!searchParams) {
        setError('Search parameters not available');
        setLoading(false);
        return;
      }

      const category = searchParams.get('category');
      const city = searchParams.get('city');

      if (!category || !city) {
        setError('Please select both a category and a city');
        setLoading(false);
        return;
      }

      try {
        console.log('Searching for vendors with params:', { category, city });
        const result = await searchVendors(category, city);
        console.log('Search results:', result);

        if ('error' in result && result.error) {
          setError(result.error);
          setVendors([]);
        } else if ('data' in result && Array.isArray(result.data)) {
          setVendors(result.data);
          setError(null);
        } else {
          setError('Invalid response from server');
          setVendors([]);
        }
      } catch (err) {
        console.error('Error fetching vendors:', err);
        setError('An error occurred while searching for vendors');
        setVendors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [searchParams]);

  if (!searchParams) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Error
            </h2>
            <p className="mt-4 text-lg text-gray-600">Search parameters not available</p>
            <div className="mt-6">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
              >
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const category = searchParams.get('category');
  const city = searchParams.get('city');

  const categoryName = categories.find(c => c.slug === category)?.name || category;
  const cityName = cities.find(c => c.slug === city)?.name || city;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Searching for {categoryName} in {cityName}...
            </h2>
            <div className="mt-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Error
            </h2>
            <p className="mt-4 text-lg text-gray-600">{error}</p>
            <div className="mt-6">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
              >
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (vendors.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              No {categoryName} found in {cityName}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Try searching in a different city or category
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
              >
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {categoryName} in {cityName}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Found {vendors.length} vendors matching your search
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </div>
    </div>
  );
} 