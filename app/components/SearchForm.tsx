'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchFormProps {
  onSearch: (category: string, city: string) => void;
}

const categories = [
  'Venues',
  'Photographers',
  'Catering',
  'DJs',
  'Florists',
  'Wedding Planners',
  'Bands',
  'Bakers',
  'Hair & Makeup',
  'Transportation'
];

const cities = [
  'Miami',
  'Orlando',
  'Tampa',
  'Fort Lauderdale',
  'Jacksonville',
  'West Palm Beach',
  'Naples',
  'Sarasota',
  'Cape Coral',
  'Pensacola'
];

export default function SearchForm({ onSearch }: SearchFormProps) {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category && city) {
      onSearch(category, city);
      router.push(`/search?category=${encodeURIComponent(category)}&city=${encodeURIComponent(city)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a city</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        disabled={!category || !city}
      >
        Search Vendors
      </button>
    </form>
  );
}
