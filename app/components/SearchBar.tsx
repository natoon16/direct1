'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cities } from '../data/cities';
import { categories } from '../data/keywords';
import type { City } from '../data/cities';
import type { Category } from '../data/keywords';

// Define major cities (top 10 most populous cities in Florida)
const MAJOR_CITIES = [
  'Jacksonville',
  'Miami',
  'Tampa',
  'Orlando',
  'St. Petersburg',
  'Hialeah',
  'Tallahassee',
  'Fort Lauderdale',
  'Port St. Lucie',
  'Cape Coral'
];

// Define popular categories (top 5 most searched categories)
const POPULAR_CATEGORIES = [
  'Wedding Venues',
  'Wedding Photographers',
  'Wedding Catering',
  'Wedding DJs',
  'Wedding Transportation'
];

export default function SearchBar() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Filter cities based on search
  const filteredCities = cities
    .filter(city => city.name.toLowerCase().includes(citySearch.toLowerCase()))
    .sort((a, b) => {
      // Sort major cities first
      const aIsMajor = MAJOR_CITIES.includes(a.name);
      const bIsMajor = MAJOR_CITIES.includes(b.name);
      if (aIsMajor && !bIsMajor) return -1;
      if (!aIsMajor && bIsMajor) return 1;
      // Then sort alphabetically
      return a.name.localeCompare(b.name);
    });

  // Filter categories based on search
  const filteredCategories = categories
    .filter(category => category.title.toLowerCase().includes(categorySearch.toLowerCase()))
    .sort((a, b) => {
      // Sort popular categories first
      const aIsPopular = POPULAR_CATEGORIES.includes(a.title);
      const bIsPopular = POPULAR_CATEGORIES.includes(b.title);
      if (aIsPopular && !bIsPopular) return -1;
      if (!aIsPopular && bIsPopular) return 1;
      // Then sort alphabetically
      return a.title.localeCompare(b.title);
    });

  // Handle clicks outside dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (selectedCity && selectedCategory) {
      const citySlug = selectedCity.toLowerCase().replace(/\s+/g, '-');
      const categorySlug = selectedCategory.toLowerCase().replace(/\s+/g, '-');
      router.push(`/city/${citySlug}/${categorySlug}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative" ref={cityDropdownRef}>
          <input
            type="text"
            placeholder="Select a city"
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setCitySearch(e.target.value);
              setShowCityDropdown(true);
            }}
            onFocus={() => setShowCityDropdown(true)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {showCityDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <div className="p-2">
                {filteredCities.map((city) => (
                  <div
                    key={city.name}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md ${
                      MAJOR_CITIES.includes(city.name) ? 'font-semibold text-indigo-600' : ''
                    }`}
                    onClick={() => {
                      setSelectedCity(city.name);
                      setShowCityDropdown(false);
                    }}
                  >
                    {city.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 relative" ref={categoryDropdownRef}>
          <input
            type="text"
            placeholder="Select a category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCategorySearch(e.target.value);
              setShowCategoryDropdown(true);
            }}
            onFocus={() => setShowCategoryDropdown(true)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {showCategoryDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <div className="p-2">
                {filteredCategories.map((category) => (
                  <div
                    key={category.slug}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md ${
                      POPULAR_CATEGORIES.includes(category.title) ? 'font-semibold text-indigo-600' : ''
                    }`}
                    onClick={() => {
                      setSelectedCategory(category.title);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    {category.title}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSearch}
          disabled={!selectedCity || !selectedCategory}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
} 