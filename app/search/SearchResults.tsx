'use client';

import { useEffect, useState } from 'react';
import VendorCard from '../components/VendorCard';
import { Vendor } from '../types/vendor';
import { categories } from '../data/categories';
import { cities } from '../data/cities';
import { searchVendors } from '../actions/search';
import { useRouter } from 'next/navigation';

type SearchResultsProps = {
  category?: string;
  city?: string;
};

export default function SearchResults({ category, city }: SearchResultsProps) {
  const router = useRouter();
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

        const categoryObj = categories.find(c => c.slug === category);
        const cityObj = cities.find(c => c.slug === city);

        if (!categoryObj || !cityObj) {
          console.error('Invalid category or city:', { category, city });
          setError('Invalid category or city selected. Please try again.');
          return;
        }

        console.log('Searching for:', { category: categoryObj.name, city: cityObj.name });
        const result = await searchVendors(categoryObj.name, cityObj.name);
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to search vendors');
        }

        if (!result.data || result.data.length === 0) {
          setError(`No ${categoryObj.name.toLowerCase()} found in ${cityObj.name}. Try a different category or city.`);
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

  const handleReturnHome = () => {
    router.push('/');
  };

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
          <button 
            onClick={handleReturnHome}
            className="text-purple-600 hover:text-purple-800"
          >
            Return to Home
          </button>
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
          <button 
            onClick={handleReturnHome}
            className="text-purple-600 hover:text-purple-800"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const categoryObj = categories.find(c => c.slug === category);
  const cityObj = cities.find(c => c.slug === city);

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          Found {vendors.length} {categoryObj?.name.toLowerCase()} in {cityObj?.name}.
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