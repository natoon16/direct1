'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cities, City } from '../data/cities';
import { categories, Category } from '../data/keywords';

export default function SearchBar() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const cityRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // Filter cities and categories based on search input
  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(citySearch.toLowerCase())
  );

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setIsCityOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (selectedCity && selectedCategory) {
      const citySlug = selectedCity.toLowerCase().replace(/\s+/g, '-');
      const categorySlug = selectedCategory.toLowerCase().replace(/\s+/g, '-');
      router.push(`/category/${categorySlug}/${citySlug}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Find Wedding Vendors in Florida
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* City Select */}
            <div className="relative" ref={cityRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select City
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedCity}
                  onClick={() => setIsCityOpen(true)}
                  onChange={(e) => {
                    setCitySearch(e.target.value);
                    setSelectedCity(e.target.value);
                    setIsCityOpen(true);
                  }}
                  placeholder="Search cities..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {isCityOpen && (
                  <div 
                    ref={cityDropdownRef}
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-[300px] overflow-y-auto"
                  >
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city: City) => (
                        <div
                          key={city.name}
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setSelectedCity(city.name);
                            setIsCityOpen(false);
                          }}
                        >
                          {city.name}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500">
                        No cities found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Category Select */}
            <div className="relative" ref={categoryRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Category
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedCategory}
                  onClick={() => setIsCategoryOpen(true)}
                  onChange={(e) => {
                    setCategorySearch(e.target.value);
                    setSelectedCategory(e.target.value);
                    setIsCategoryOpen(true);
                  }}
                  placeholder="Search categories..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {isCategoryOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-[300px] overflow-y-auto">
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((category: Category) => (
                        <div
                          key={category.slug}
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setSelectedCategory(category.title);
                            setIsCategoryOpen(false);
                          }}
                        >
                          {category.title}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500">
                        No categories found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={!selectedCity || !selectedCategory}
            className={`mt-8 w-full py-4 px-4 rounded-md text-white font-medium text-lg ${
              selectedCity && selectedCategory
                ? 'bg-indigo-600 hover:bg-indigo-700'
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