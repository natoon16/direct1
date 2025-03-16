import { notFound } from 'next/navigation';
import { categories, Category } from '@/data/keywords';
import { cities, City } from '@/data/cities';
import { Metadata } from 'next';
import Link from 'next/link';
import { searchPlaces } from '@/lib/places';

interface Props {
  params: {
    slug: string;
    city: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const category = categories.find((c: Category) => c.slug === params.slug);
  const city = cities.find((c: City) => c.name.toLowerCase() === params.city);
  if (!category || !city) return {};

  return {
    title: `Top 10 Best ${category.title} in ${city.name}, Florida - Wedding Directory`,
    description: `Find the best ${category.title.toLowerCase()} in ${city.name}, Florida. Compare ratings and reviews for top wedding ${category.name.toLowerCase()} in ${city.name}.`,
  };
}

export default async function CategoryCityPage({ params }: Props) {
  const categorySlug = decodeURIComponent(params.slug);
  const cityName = decodeURIComponent(params.city);
  
  const category = categories.find((c: Category) => c.slug === categorySlug);
  const city = cities.find((c: City) => c.name.toLowerCase() === cityName.toLowerCase());
  if (!city || !category) {
    notFound();
  }

  const query = category.name.toLowerCase().includes('wedding') 
    ? category.name.toLowerCase()
    : `wedding ${category.name.toLowerCase()}`;
    
  const results = await searchPlaces(query, city.name, category.name);

  const hasResults = results?.places && results.places.length > 0;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <div className="flex items-center gap-x-3 sm:gap-x-4 text-xs sm:text-sm">
            <Link href="/cities" className="text-rose-600 hover:text-rose-500">
              Cities
            </Link>
            <span className="h-1 w-1 rounded-full bg-gray-200" />
            <Link href={`/city/${city.name.toLowerCase()}`} className="text-rose-600 hover:text-rose-500">
              {city.name}
            </Link>
          </div>
          <h1 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
            {category.title} in {city.name}, Florida
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600">
            Discover the best {category.name.toLowerCase()} in {city.name}. Browse through our curated list of top wedding professionals.
          </p>
        </div>

        {!hasResults ? (
          <div className="mt-12 sm:mt-16 text-center">
            <div className="rounded-lg border-2 border-dashed border-gray-200 p-6 sm:p-12">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                No Results Found
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                We couldn't find any {category.name.toLowerCase()} in {city.name} at the moment.
              </p>
              <Link
                href="/cities"
                className="inline-flex items-center rounded-md bg-rose-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
              >
                Browse Other Cities
              </Link>
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-12 sm:mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:gap-x-8 lg:gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
            {results.places.map((place: any) => (
              <article
                key={place.id}
                className="flex flex-col items-start border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-150 hover:border-rose-200 hover:bg-rose-50/10"
              >
                <div className="flex items-center gap-x-3 sm:gap-x-4 text-xs sm:text-sm">
                  <time className="text-gray-900 font-medium">
                    {place.rating ? (
                      <span>
                        <span className="text-gray-900">{place.rating}</span>
                        <span className="text-amber-500"> ★</span>
                      </span>
                    ) : 'No rating'}
                  </time>
                  {place.userRatingCount && (
                    <span className="text-gray-500">
                      ({place.userRatingCount} reviews)
                    </span>
                  )}
                </div>
                <div className="group relative w-full">
                  <h3 className="mt-2 sm:mt-3 text-base sm:text-lg font-semibold leading-6 text-gray-900 group-hover:text-rose-600 transition-colors duration-150">
                    {place.displayName.text}
                  </h3>
                  <p className="mt-3 sm:mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {place.formattedAddress}
                  </p>
                </div>
                {place.websiteUri && (
                  <div className="mt-3 sm:mt-4">
                    <a
                      href={place.websiteUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-rose-600 hover:text-rose-500 transition-all duration-150 ease-in-out hover:translate-x-0.5"
                    >
                      Visit Website <span className="ml-1 transition-transform duration-150 group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 