import { cities } from '@/data/cities';
import { categories } from '@/data/keywords';
import Link from 'next/link';
import SearchBox from '@/components/SearchBox';

export default function Home() {
  // Get top 6 cities for popular searches
  const topCities = cities.slice(0, 6);
  const popularCategories = categories.slice(0, 6);

  return (
    <main>
      {/* Hero Section with Search */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-purple-100 to-white">
        <div className="mx-auto max-w-7xl px-6 pt-2 pb-12 sm:pb-20 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Find the Perfect Wedding Vendors in Florida
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover and connect with the best wedding professionals in your city. From venues to photographers, find everything you need for your special day.
            </p>
            <div className="mt-8">
              <SearchBox />
            </div>
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Popular Categories
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Browse through our most popular wedding vendor categories
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {popularCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="flex flex-col rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-200 hover:border-purple-200 group"
              >
                <h3 className="text-lg font-semibold leading-7 tracking-tight text-gray-900 group-hover:text-purple-600">
                  {category.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Find the best {category.name.toLowerCase()} for your wedding day
                </p>
                <div className="mt-4 flex items-center gap-x-2 text-sm text-purple-600 group-hover:translate-x-1 transition-transform duration-200">
                  Browse {category.title}
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Cities */}
      <div className="bg-gradient-to-b from-white to-purple-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Popular Cities
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Explore wedding vendors in major Florida cities
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {topCities.map((city) => (
              <Link
                key={city.name}
                href={`/city/${city.name.toLowerCase()}`}
                className="flex flex-col rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-200 hover:border-purple-200 group"
              >
                <h3 className="text-lg font-semibold leading-7 tracking-tight text-gray-900 group-hover:text-purple-600">
                  {city.name}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Discover wedding vendors in {city.name}, Florida
                </p>
                <div className="mt-4 flex items-center gap-x-2 text-sm text-purple-600 group-hover:translate-x-1 transition-transform duration-200">
                  Browse {city.name} Vendors
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
