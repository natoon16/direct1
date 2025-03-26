import { cities, City } from '../../../data/cities';
import { categories, Category } from '../../../data/keywords';
import { searchPlaces, Place } from '../../../lib/places';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import VendorCard from '../../../components/VendorCard';

type Props = {
  params: Promise<{
    category: string;
    city: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  // Validate category and city
  const category = categories.find((c: Category) => c.slug === resolvedParams.category);
  const cityName = resolvedParams.city.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  const city = cities.find((c: City) => c.name.toLowerCase() === cityName.toLowerCase());

  if (!category || !city) {
    return {
      title: 'Search Not Found - Wedding Directory Florida',
      description: 'The requested category or city was not found in our directory.'
    };
  }

  return {
    title: `${category.title} in ${city.name}, FL - Wedding Directory Florida`,
    description: `Find the best ${category.title.toLowerCase()} in ${city.name}, Florida. Browse and connect with top-rated wedding ${category.name.toLowerCase()} for your special day.`,
  };
}

export default async function CityCategoryPage({ params }: Props) {
  const resolvedParams = await params;
  // Validate category and city
  const category = categories.find((c: Category) => c.slug === resolvedParams.category);
  const cityName = resolvedParams.city.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  const city = cities.find((c: City) => c.name.toLowerCase() === cityName.toLowerCase());

  // If category or city not found in our lists, redirect to search-not-found
  if (!category || !city) {
    notFound();
  }

  try {
    // Search for vendors using Google Places API with caching
    const { places } = await searchPlaces(cityName, category.name);

    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          {/* Hero Section */}
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {category.title} in {city.name}, Florida
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Browse and connect with the best {category.title.toLowerCase()} in {city.name}. 
              Find the perfect wedding professional for your special day.
            </p>
          </div>

          {/* Results Grid */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {places.length > 0 ? (
              places.map((place: Place) => (
                <VendorCard key={place.place_id} vendor={place} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900">
                  No vendors found
                </h2>
                <p className="mt-2 text-gray-600">
                  We couldn't find any {category.title.toLowerCase()} in {city.name} at the moment. 
                  Please try another category or city.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching vendors:', error);
    notFound();
  }
} 