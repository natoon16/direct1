import { categories } from '@/data/keywords';
import { cities } from '@/data/cities';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props {
  params: {
    slug: string;
  };
}

async function searchPlaces(category: string, city: string) {
  const query = `wedding ${category.toLowerCase()} in ${city}, Florida`;
  const response = await fetch(
    `https://places.googleapis.com/v1/places:searchText`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY || '',
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.websiteUri,places.rating,places.userRatingCount',
      },
      body: JSON.stringify({
        textQuery: query,
        rankPreference: 'RELEVANCE',
        maxResultCount: 10,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }

  return response.json();
}

export async function generateMetadata({ params }: Props) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return {};

  return {
    title: `Top 10 Best ${category.title} in Florida - Wedding Directory`,
    description: `Find the best ${category.title.toLowerCase()} in Florida. Compare ratings and reviews for top wedding ${category.name.toLowerCase()} in major Florida cities.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  // For demo, we'll just use Jacksonville as an example
  const results = await searchPlaces(category.name, 'Jacksonville');

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {category.title} in Florida
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {category.description}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {results.places?.map((place: any) => (
            <article
              key={place.id}
              className="flex flex-col items-start border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time className="text-gray-900 font-medium">
                  {place.rating ? `${place.rating} ★` : 'No rating'}
                </time>
                {place.userRatingCount && (
                  <span className="text-gray-500">
                    ({place.userRatingCount} reviews)
                  </span>
                )}
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  {place.displayName.text}
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {place.formattedAddress}
                </p>
              </div>
              {place.websiteUri && (
                <div className="mt-4">
                  <a
                    href={place.websiteUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-rose-600 hover:text-rose-500"
                  >
                    Visit Website →
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Browse by City
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
            {cities.map((city) => (
              <Link
                key={city.name}
                href={`/category/${params.slug}/${city.name.toLowerCase()}`}
                className="text-base text-gray-600 hover:text-rose-600"
              >
                {category.name} in {city.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 