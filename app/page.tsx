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
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Find Your Perfect Wedding Vendors in Florida
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Discover top-rated wedding professionals across Florida. From venues to photographers, find everything you need for your special day.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl ring-1 ring-gray-900/10 md:-mr-20 lg:-mr-36" aria-hidden="true" />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36" aria-hidden="true" />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                          <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                            SearchBar.tsx
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pt-6 pb-14">
                        <SearchBar />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                  Find {category.title.toLowerCase()} across Florida
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 