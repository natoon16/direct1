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
      router.push(`/city/${selectedCity.toLowerCase()}/${selectedCategory.toLowerCase()}`);
    } else if (selectedCity) {
      router.push(`/city/${selectedCity.toLowerCase()}`);
    } else if (selectedCategory) {
      router.push(`/category/${selectedCategory.toLowerCase()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-4">
      <div className="relative flex-1">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="block w-full rounded-lg border-gray-300 py-3 pl-4 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500"
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <div className="relative flex-1">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block w-full rounded-lg border-gray-300 py-3 pl-4 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-6 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Search
      </button>
    </form>
  );
} 