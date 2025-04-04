'use client';

import { useEffect, useState } from 'react';
import VendorCard from '../components/VendorCard';
import { Vendor } from '../types/vendor';
import { categories } from '../data/categories';
import { cities } from '../data/cities';
import { searchVendors } from '../actions/search';

type SearchResultsProps = {
  category?: string;
  city?: string;
};

export default function SearchResults({ category, city }: SearchResultsProps) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVendors() {
      try {
        if (!category || !city) {
          setError('Please select both a category and a city to search for vendors.');
          return;
        }

        setLoading(true);
        setError(null);

        const categoryName = categories.find(c => c.slug === category)?.name;
        const cityName = cities.find(c => c.slug === city)?.name;

        if (!categoryName || !cityName) {
          setError('Invalid category or city selected. Please try again.');
          return;
        }

        console.log('Searching for:', { category: categoryName, city: cityName });
        const result = await searchVendors(categoryName, cityName);
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to search vendors');
        }

        if (!result.data || result.data.length === 0) {
          setError(`No ${categoryName.toLowerCase()} found in ${cityName}. Try a different category or city.`);
          return;
        }

        console.log('Found places:', result.data.length);
        setVendors(result.data);
      } catch (err) {
        console.error('Error fetching vendors:', err);
        setError('Failed to load vendors. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchVendors();
  }, [category, city]);

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
        <div className="mt-4">
          <a href="/" className="text-purple-600 hover:text-purple-800">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  if (!category || !city) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please select a category and city to search for vendors.</p>
      </div>
    );
  }

  if (vendors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No vendors found. Try different search criteria.</p>
        <div className="mt-4">
          <a href="/" className="text-purple-600 hover:text-purple-800">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          Found {vendors.length} {categories.find(c => c.slug === category)?.name.toLowerCase()} in {cities.find(c => c.slug === city)?.name}.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
} 