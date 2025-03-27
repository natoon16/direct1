'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cities } from '../data/cities';
import { categories } from '../data/keywords';
import type { City } from '../data/cities';
import type { Category } from '../data/keywords';

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
  const filteredCities = cities
    .filter((city: City) => 
      city.name.toLowerCase().includes(citySearch.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort cities alphabetically

  const filteredCategories = categories
    .filter((category: Category) => 
      category.title.toLowerCase().includes(categorySearch.toLowerCase())
    )
    .sort((a, b) => a.title.localeCompare(b.title)); // Sort categories alphabetically

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
      router.push(`/city/${citySlug}/${categorySlug}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City Selection */}
          <div ref={cityRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
              placeholder="Search from 100+ Florida cities..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            />
            {isCityOpen && (
              <div 
                ref={cityDropdownRef}
                className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-[400px] overflow-y-auto custom-scrollbar"
              >
                {filteredCities.length > 0 ? (
                  filteredCities.map((city: City) => (
                    <div
                      key={city.name}
                      className="px-4 py-3 hover:bg-indigo-50 cursor-pointer flex items-center justify-between border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        setSelectedCity(city.name);
                        setCitySearch('');
                        setIsCityOpen(false);
                      }}
                    >
                      <span className="font-medium">{city.name}</span>
                      <span className="text-sm text-gray-500">{city.county} County</span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500">No cities found</div>
                )}
              </div>
            )}
          </div>

          {/* Category Selection */}
          <div ref={categoryRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
              placeholder="Search from 50+ vendor categories..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            />
            {isCategoryOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-[400px] overflow-y-auto custom-scrollbar">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category: Category) => (
                    <div
                      key={category.slug}
                      className="px-4 py-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        setSelectedCategory(category.slug);
                        setCategorySearch('');
                        setIsCategoryOpen(false);
                      }}
                    >
                      {category.title}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500">No categories found</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSearch}
            disabled={!selectedCity || !selectedCategory}
            className={`px-10 py-3 rounded-xl text-white font-medium text-lg transition-all duration-200 ${
              selectedCity && selectedCategory
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
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