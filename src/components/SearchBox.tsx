'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cities } from '@/data/cities';
import { categories } from '@/data/keywords';

export default function SearchBox() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCity && selectedCategory) {
      const categorySlug = categories.find(c => c.name === selectedCategory)?.slug;
      const citySlug = selectedCity.toLowerCase();
      router.push(`/category/${categorySlug}/${citySlug}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto px-4 sm:px-0">
      <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
        <div className="flex-1">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            What are you looking for?
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full rounded-md border-0 py-2.5 sm:py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-rose-600 text-sm sm:text-base"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.name}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            Where?
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="block w-full rounded-md border-0 py-2.5 sm:py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-rose-600 text-sm sm:text-base"
            required
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-150 md:self-end md:mb-[1px]"
        >
          Search
        </button>
      </div>
    </form>
  );
} 