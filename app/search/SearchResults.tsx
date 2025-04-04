'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchVendors } from '../actions/search';
import { Vendor } from '../types/vendor';
import VendorCard from '../components/VendorCard';
import { categories } from '../data/categories';
import { cities } from '../data/cities';

interface SearchResultsProps {
  category: string;
  city: string;
}

export default function SearchResults({ category, city }: SearchResultsProps) {
  const router = useRouter();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVendors() {
      try {
        setLoading(true);
        setError(null);

        if (!category || !city) {
          console.log('Invalid search parameters:', { category, city });
          setError('Please select both a category and a city');
          setLoading(false);
          return;
        }

        console.log('Fetching vendors for:', { category, city });
        const result = await searchVendors(category, city);
        console.log('Search result:', result);

        if (!result.success) {
          console.error('Search failed:', result.error);
          setError(result.error || 'Failed to search vendors');
          setLoading(false);
          return;
        }

        if (!result.data || result.data.length === 0) {
          console.log('No vendors found');
          setVendors([]);
        } else {
          console.log(`Found ${result.data.length} vendors`);
          setVendors(result.data);
        }
      } catch (err) {
        console.error('Error fetching vendors:', err);
        setError('An error occurred while searching for vendors');
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
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-gray-600">Searching for vendors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={handleReturnHome}
          className="text-purple-600 hover:text-purple-800"
        >
          Return to Home
        </button>
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