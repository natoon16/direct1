import { categories } from '@/data/keywords';
import { cities } from '@/data/cities';
import SearchBox from '@/components/SearchBox';

export const metadata = {
  title: 'Search Wedding Vendors in Florida - Wedding Directory',
  description: 'Search for wedding vendors and services across Florida. Find venues, photographers, caterers, and more in your city.',
};

export default function SearchPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Search Wedding Vendors
          </h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Find the perfect wedding vendors in your area
          </p>
        </div>

        <div className="mt-16">
          <SearchBox />
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Popular Searches
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((category) => (
              <div
                key={category.slug}
                className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md hover:border-purple-200 group"
              >
                <h3 className="text-lg font-semibold leading-7 tracking-tight text-gray-900 group-hover:text-purple-600">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 