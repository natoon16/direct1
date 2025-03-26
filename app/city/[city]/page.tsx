import React from 'react';
import { getVendors } from '../../../lib/mongodb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cities, City } from '../../data/cities';
import { categories, Category } from '../../data/keywords';
import { Metadata } from 'next';

interface Vendor {
  name: string;
  address: string;
  rating?: number;
  website?: string;
  category?: string;
}

type Props = {
  params: Promise<{
    city: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const cityName = resolvedParams.city.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  const city = cities.find((c: City) => c.name.toLowerCase() === cityName.toLowerCase());

  if (!city) {
    return {
      title: 'City Not Found - Wedding Directory Florida',
      description: 'The requested city was not found in our directory.'
    };
  }

  return {
    title: `Wedding Vendors in ${city.name}, FL - Wedding Directory Florida`,
    description: `Find the best wedding vendors and services in ${city.name}, Florida. Browse through our curated list of local wedding professionals.`,
  };
}

export default async function CityPage({ params }: Props) {
  const resolvedParams = await params;
  const cityName = resolvedParams.city.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  const city = cities.find((c: City) => c.name.toLowerCase() === cityName.toLowerCase());

  if (!city) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Wedding Vendors in {city.name}, Florida
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find the best wedding vendors and services in {city.name}. Browse through our curated list of local wedding professionals.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category: Category) => (
            <Link
              key={category.slug}
              href={`/city/${city.name.toLowerCase().replace(/\s+/g, '-')}/${category.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-1 flex-col">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                  {category.title}
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