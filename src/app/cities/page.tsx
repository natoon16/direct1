import { cities } from '@/data/cities';
import { categories } from '@/data/keywords';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Florida Wedding Vendors by City - Wedding Directory Florida',
  description: 'Find wedding vendors in cities across Florida. Browse photographers, venues, caterers, and more in your local area.',
};

export default function CitiesPage() {
  // Sort cities by population for major cities
  const sortedCities = [...cities].sort((a, b) => b.population - a.population);
  const majorCities = sortedCities.slice(0, 10); // Top 10 cities

  // Group remaining cities by first letter
  const cityGroups = sortedCities.slice(10).reduce((acc, city) => {
    const firstLetter = city.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(city);
    return acc;
  }, {} as Record<string, typeof cities>);

  // Get all available letters
  const letters = Object.keys(cityGroups).sort();

  // Helper function to create city URL
  const getCityUrl = (cityName: string) => `/city/${cityName.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Florida Wedding Vendors by City
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find wedding vendors in your city. Browse through our comprehensive directory of wedding professionals across Florida.
          </p>
        </div>

        {/* Major Cities Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
            Major Cities
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {majorCities.map((city) => (
              <div key={city.name} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  <Link href={getCityUrl(city.name)} className="hover:text-rose-600 transition-colors">
                    {city.name}
                  </Link>
                </h3>
                <div className="space-y-2">
                  {categories.slice(0, 3).map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}/${city.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block text-sm text-gray-600 hover:text-rose-600 transition-colors"
                    >
                      {category.title}
                    </Link>
                  ))}
                  <Link
                    href={getCityUrl(city.name)}
                    className="block text-sm font-medium text-rose-600 hover:text-rose-500 mt-4"
                  >
                    View all vendors →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alphabetical Index */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
            All Cities
          </h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#${letter}`}
                className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-rose-600 border border-gray-200 rounded-md hover:border-rose-200 transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>

          {/* Cities by Letter */}
          <div className="space-y-12">
            {letters.map((letter) => (
              <div key={letter} id={letter} className="scroll-mt-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {letter}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {cityGroups[letter].map((city) => (
                    <Link
                      key={city.name}
                      href={getCityUrl(city.name)}
                      className="text-gray-600 hover:text-rose-600 transition-colors"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 