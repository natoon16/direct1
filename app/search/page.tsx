import { Metadata } from 'next';
import { Suspense } from 'react';
import SearchForm from '../components/SearchForm';
import VendorResults from '../components/VendorResults';
import { categories } from '../data/categories';
import { cities } from '../data/cities';

type SearchPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const category = categories.find(c => c.slug === searchParams.category as string);
  const city = cities.find(c => c.slug === searchParams.city as string);

  const title = category && city
    ? `${category.name} in ${city.name}, FL | Wedding Directory Florida`
    : 'Search Wedding Vendors | Wedding Directory Florida';

  const description = category && city
    ? `Find the best ${category.name.toLowerCase()} in ${city.name}, Florida. Browse our directory of top-rated wedding professionals.`
    : 'Search for wedding vendors in Florida. Find and compare the best wedding professionals for your special day.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const category = searchParams.category as string;
  const city = searchParams.city as string;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {category && city
              ? `${categories.find(c => c.slug === category)?.name} in ${cities.find(c => c.slug === city)?.name}, FL`
              : 'Search Wedding Vendors'}
          </h1>
          <SearchForm />
        </div>

        <Suspense fallback={
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading vendors...</p>
          </div>
        }>
          {category && city ? (
            <VendorResults category={category} city={city} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Please select a category and city to see wedding vendors.
              </p>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
} 