import { cities } from '@/data/cities';
import { categories } from '@/data/keywords';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props {
  params: {
    name: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const city = cities.find(
    (c) => c.name.toLowerCase() === params.name.toLowerCase()
  );
  if (!city) return {};

  return {
    title: `Wedding Vendors in ${city.name}, Florida - Wedding Directory`,
    description: `Find the best wedding vendors and services in ${city.name}, Florida. Browse venues, photographers, caterers, and more for your wedding.`,
  };
}

export default async function CityPage({ params }: Props) {
  const city = cities.find(
    (c) => c.name.toLowerCase() === params.name.toLowerCase()
  );
  if (!city) notFound();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Wedding Vendors in {city.name}, Florida
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover the best wedding vendors and services in {city.name}. Browse through our comprehensive directory of local wedding professionals.
          </p>
        </div>

        {/* Browse Categories Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-12">
            Browse Wedding Services in {city.name}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}/${city.name.toLowerCase()}`}
                className="group relative rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-150 ease-in-out hover:border-rose-200 hover:bg-rose-50/10 hover:-translate-y-0.5"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors duration-150">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {category.description}
                </p>
                <span
                  className="inline-flex items-center text-sm font-medium text-rose-600 group-hover:text-rose-500 transition-all duration-150 ease-in-out"
                >
                  View Vendors <span className="ml-1 transform transition-transform duration-150 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 