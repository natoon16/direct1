import Link from 'next/link';
import { categories } from '@/data/keywords';
import { cities } from '@/data/cities';

export const metadata = {
  title: 'Wedding Services Categories | Florida Wedding Directory',
  description: 'Browse all wedding services and vendors by category across Florida cities. Find venues, photographers, caterers, and more.',
};

export default function CategoriesPage() {
  // Get top 5 cities by population
  const topCities = cities.slice(0, 5);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-6 py-12 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="gradient-text text-4xl font-bold tracking-tight sm:text-6xl">
            Wedding Services
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Browse wedding vendors and services by category
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <div 
              key={category.slug}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                <Link 
                  href={`/category/${category.slug}`}
                  className="hover:text-rose-600 transition-colors"
                >
                  {category.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                {category.description}
              </p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Popular cities:</p>
                {topCities.map((city) => (
                  <div key={`${category.slug}-${city.name}`}>
                    <Link
                      href={`/category/${category.slug}/${city.name.toLowerCase()}`}
                      className="text-sm text-gray-600 hover:text-rose-600 transition-colors block"
                    >
                      {category.name} in {city.name}
                    </Link>
                  </div>
                ))}
                <div className="pt-2">
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-sm text-rose-600 hover:text-rose-700 font-medium transition-colors inline-flex items-center"
                  >
                    View all cities <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 