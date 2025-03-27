'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cities } from '../data/cities';
import { categories } from '../data/keywords';
import type { City, Category } from '../data/keywords';

export default function SearchBar() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const cityRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);

  // Filter cities and categories based on search input
  const filteredCities = cities.filter((city: City) => 
    city.name.toLowerCase().includes(citySearch.toLowerCase())
  );

  const filteredCategories = categories.filter((category: Category) => 
    category.title.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setIsCityOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus city input when dropdown opens
  useEffect(() => {
    if (isCityOpen && cityInputRef.current) {
      cityInputRef.current.focus();
    }
  }, [isCityOpen]);

  const handleSearch = () => {
    if (selectedCity && selectedCategory) {
      const citySlug = selectedCity.toLowerCase().replace(/\s+/g, '-');
      const categorySlug = selectedCategory.toLowerCase().replace(/\s+/g, '-');
      router.push(`/category/${categorySlug}/${citySlug}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* City Selection */}
          <div ref={cityRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select City
            </label>
            <input
              ref={cityInputRef}
              type="text"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setCitySearch(e.target.value);
                setIsCityOpen(true);
              }}
              onFocus={() => setIsCityOpen(true)}
              placeholder="Search cities..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {isCityOpen && (
              <div 
                ref={cityDropdownRef}
                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-[400px] overflow-y-auto"
              >
                {filteredCities.length > 0 ? (
                  filteredCities.map((city: City) => (
                    <div
                      key={city.name}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedCity(city.name);
                        setCitySearch('');
                        setIsCityOpen(false);
                      }}
                    >
                      {city.name}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No cities found</div>
                )}
              </div>
            )}
          </div>

          {/* Category Selection */}
          <div ref={categoryRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Category
            </label>
            <input
              type="text"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCategorySearch(e.target.value);
                setIsCategoryOpen(true);
              }}
              onFocus={() => setIsCategoryOpen(true)}
              placeholder="Search categories..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {isCategoryOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-[400px] overflow-y-auto">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category: Category) => (
                    <div
                      key={category.slug}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedCategory(category.title);
                        setCategorySearch('');
                        setIsCategoryOpen(false);
                      }}
                    >
                      {category.title}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No categories found</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleSearch}
            disabled={!selectedCity || !selectedCategory}
            className={`px-8 py-3 rounded-md text-white font-medium ${
              selectedCity && selectedCategory
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Search Vendors
          </button>
        </div>
      </div>
    </div>
  );
} 