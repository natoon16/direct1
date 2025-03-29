import { Metadata } from 'next';
import { Suspense } from 'react';
import SearchForm from '../components/SearchForm';
import VendorResults from '../components/VendorResults';
import { categories } from '../data/categories';
import { cities } from '../data/cities';
import SearchResults from './SearchResults';

type SearchPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const category = categories.find(c => c.slug === params.category as string);
  const city = cities.find(c => c.slug === params.city as string);

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

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Wedding Vendors</h1>
          <SearchForm />
        </div>
        <SearchResults />
      </div>
    </div>
  );
} 