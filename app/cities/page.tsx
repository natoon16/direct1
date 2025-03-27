import React from 'react';
import Link from 'next/link';
import { cities } from '../../data/cities';
import { categories } from '../../data/keywords';

// Get top 3 categories for each city
const topCategories = categories.slice(0, 3);

export default function CitiesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Florida Wedding Vendors by City</h1>
      <p className="text-lg mb-12">
        Find the perfect wedding vendors in your Florida city. Browse through our comprehensive directory of wedding professionals across the Sunshine State.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cities.map((city) => (
          <div key={city} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <Link href={`/city/${city.toLowerCase().replace(/\s+/g, '-')}`}>
              <h2 className="text-2xl font-semibold mb-4 text-purple-600 hover:text-purple-800">
                {city}
              </h2>
            </Link>
            
            <div className="space-y-2">
              {topCategories.map((category) => (
                <Link 
                  key={`${city}-${category}`}
                  href={`/city/${city.toLowerCase().replace(/\s+/g, '-')}/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {category} in {city}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 