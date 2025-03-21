'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cities } from '../data/cities';
import { categories } from '../data/keywords';

export default function SearchBox() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCity && selectedCategory) {
      router.push(`/city/${encodeURIComponent(selectedCity.toLowerCase())}?category=${encodeURIComponent(selectedCategory.toLowerCase())}`);
    } else if (selectedCity) {
      router.push(`/city/${encodeURIComponent(selectedCity.toLowerCase())}`);
    } else if (selectedCategory) {
      router.push(`/category/${encodeURIComponent(selectedCategory.toLowerCase())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-4 max-w-4xl mx-auto">
      <div className="relative flex-1">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-gray-900 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 h-[50px]"
          style={{ maxHeight: '50px' }}
        >
          <option value="" className="text-gray-500">Select a city</option>
          <optgroup label="Major Cities">
            {cities.slice(0, 5).map((city) => (
              <option key={city.name} value={city.name} className="text-gray-900">
                {city.name} ({city.county} County)
              </option>
            ))}
          </optgroup>
          <optgroup label="All Cities">
            {cities.slice(5).map((city) => (
              <option key={city.name} value={city.name} className="text-gray-900">
                {city.name} ({city.county} County)
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <div className="relative flex-1">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-gray-900 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 h-[50px]"
          style={{ maxHeight: '50px' }}
        >
          <option value="" className="text-gray-500">Select a category</option>
          <optgroup label="Popular Categories">
            {categories.slice(0, 8).map((category) => (
              <option key={category.slug} value={category.slug} className="text-gray-900">
                {category.title}
              </option>
            ))}
          </optgroup>
          <optgroup label="More Categories">
            {categories.slice(8).map((category) => (
              <option key={category.slug} value={category.slug} className="text-gray-900">
                {category.title}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-6 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 h-[50px]"
      >
        Search
      </button>
    </form>
  );
} 