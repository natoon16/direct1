'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '../data/categories';
import { cities } from '../data/cities';

export default function SearchForm() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category && city) {
      router.push(`/search?category=${encodeURIComponent(category)}&city=${encodeURIComponent(city)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <div className="relative">
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setIsCityDropdownOpen(true);
              }}
              onFocus={() => setIsCityDropdownOpen(true)}
              placeholder="Search for a city"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
            {isCityDropdownOpen && (
              <div 
                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
                style={{ maxHeight: '240px' }}
              >
                {cities
                  .filter(c => 
                    c.name.toLowerCase().includes(city.toLowerCase()) ||
                    c.county.toLowerCase().includes(city.toLowerCase())
                  )
                  .map((c) => (
                    <div
                      key={c.slug}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setCity(c.slug);
                        setIsCityDropdownOpen(false);
                      }}
                    >
                      <div className="font-medium">{c.name}</div>
                      <div className="text-sm text-gray-500">{c.county} County</div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full md:w-auto px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Search
      </button>
    </form>
  );
}
