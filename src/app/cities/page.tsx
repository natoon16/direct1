import Link from 'next/link';
import { cities } from '@/data/cities';
import { categories } from '@/data/keywords';

export const metadata = {
  title: 'Major Cities in Florida | Florida Wedding Directory',
  description: 'Find wedding vendors and services in major Florida cities. Browse venues, photographers, caterers, and more in top Florida destinations.',
};

export default function CitiesPage() {
  // Get the first three most important categories
  const topCategories = categories.slice(0, 3);
  // Get major cities (top 12)
  const majorCities = cities.slice(0, 12);
  
  // Group other cities by first letter
  const otherCities = cities.slice(12).reduce((acc: { [key: string]: typeof cities }, city) => {
    const firstLetter = city.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(city);
    return acc;
  }, {});

  // Get all available letters
  const letters = Object.keys(otherCities).sort();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-6 py-12 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="gradient-text text-4xl font-bold tracking-tight sm:text-6xl">
            Major Cities in Florida
          </h1>
          <p className="mt-8 text-lg leading-8 text-gray-600">
            Find wedding vendors and services in Florida's largest cities
          </p>
        </div>

        {/* Major Cities Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {majorCities.map((city) => (
            <div key={city.name} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {city.name}
                </h2>
                <span className="text-xs text-gray-500">#{city.rank}</span>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm text-gray-600">{city.county} County</span>
              </div>
              
              <div className="space-y-3">
                {topCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}/${city.name.toLowerCase()}`}
                    className="group block p-3 rounded-md border border-gray-100 hover:border-rose-200 hover:bg-rose-50/10 transition-all duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 group-hover:text-rose-600 transition-colors">
                        {category.name}
                      </span>
                      <span className="text-rose-600 transform transition-transform duration-150 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Alphabetical Directory */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Other Cities</h2>
          
          {/* A-Z Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-rose-100 hover:text-rose-600 transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>

          {/* Cities by Letter */}
          <div className="space-y-12">
            {letters.map((letter) => (
              <div key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{letter}</h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {otherCities[letter].map((city) => (
                    <div key={city.name} className="space-y-2">
                      <h4 className="text-gray-900 font-medium">{city.name}</h4>
                      <div className="space-y-1">
                        {topCategories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/category/${category.slug}/${city.name.toLowerCase()}`}
                            className="text-sm text-gray-600 hover:text-rose-600 transition-colors block"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
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