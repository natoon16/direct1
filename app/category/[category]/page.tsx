import React from 'react';
import { getVendors } from '../../../lib/mongodb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cities, City } from '../../data/cities';
import { categories, Category } from '../../data/keywords';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryParam = resolvedParams.category;
  // Validate category
  const category = categories.find((c: Category) => c.slug === categoryParam);

  if (!category) {
    return {
      title: 'Category Not Found - Wedding Directory Florida',
      description: 'The requested category was not found in our directory.'
    };
  }

  return {
    title: `${category.title} in Florida - Wedding Directory Florida`,
    description: `Find the best ${category.title.toLowerCase()} across Florida. Browse and connect with top-rated wedding ${category.name.toLowerCase()} for your special day.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const categoryParam = resolvedParams.category;
  // Validate category
  const category = categories.find((c: Category) => c.slug === categoryParam);

  // If category not found in our lists, redirect to search-not-found
  if (!category) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {category.title} in Florida
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Browse and connect with the best {category.title.toLowerCase()} across Florida. 
            Find the perfect wedding professional for your special day.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city: City) => (
            <Link
              key={city.name}
              href={`/category/${category.slug}/${city.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-1 flex-col">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                  {city.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Find {category.title.toLowerCase()} in {city.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 