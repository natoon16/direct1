import { cities, City } from './data/cities';
import { categories, Category } from './data/keywords';
import { Metadata } from 'next';
import Link from 'next/link';
import SearchBar from './components/SearchBar';

export const metadata: Metadata = {
  title: 'Wedding Directory Florida - Find Wedding Vendors',
  description: 'Find the best wedding vendors and services across Florida. Browse through our curated list of local wedding professionals.',
};

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section with Search */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Find Your Perfect Wedding Vendors in Florida
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Discover top-rated wedding professionals across Florida. From venues to photographers, find everything you need for your special day.
            </p>
            <div className="mt-10">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cities */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Popular Cities
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find wedding vendors in major cities across Florida.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-3">
          {cities.slice(0, 6).map((city: City) => (
            <Link
              key={city.name}
              href={`/city/${city.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-1 flex-col">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                  {city.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Find wedding vendors in {city.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Categories */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Popular Categories
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Browse through our selection of wedding vendor categories.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-3">
          {categories.slice(0, 6).map((category: Category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-1 flex-col">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Find {category.title.toLowerCase()} in Florida
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 