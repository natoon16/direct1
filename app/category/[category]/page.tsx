import React from 'react';
import { getVendors } from '../../../lib/mongodb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cities } from '../../../data/cities';

const categories = [
  { slug: 'venues', display: 'Venues' },
  { slug: 'photography', display: 'Photography' },
  { slug: 'videography', display: 'Videography' },
  { slug: 'wedding-planners', display: 'Wedding Planners' },
  { slug: 'catering', display: 'Catering' },
  { slug: 'florists', display: 'Florists' },
  { slug: 'djs', display: 'DJs' },
  { slug: 'bands', display: 'Bands' },
  { slug: 'hair-makeup', display: 'Hair & Makeup' },
  { slug: 'dresses-attire', display: 'Dresses & Attire' },
  { slug: 'jewelry', display: 'Jewelry' },
  { slug: 'transportation', display: 'Transportation' },
  { slug: 'invitations', display: 'Invitations' },
  { slug: 'favors-gifts', display: 'Favors & Gifts' },
  { slug: 'rentals', display: 'Rentals' },
  { slug: 'officiants', display: 'Officiants' },
  { slug: 'bakeries', display: 'Bakeries' },
  { slug: 'decor', display: 'Decor' }
];

interface Props {
  params: { category: string };
}

export default async function CategoryPage({ params }: Props) {
  const categorySlug = params.category;
  const category = categories.find(
    c => c.slug === categorySlug.toLowerCase()
  );

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <nav className="text-sm mb-4" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="text-purple-600 hover:text-purple-800">
                Home
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <Link href="/categories" className="text-purple-600 hover:text-purple-800">
                Categories
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <span className="text-gray-700">{category.display}</span>
            </li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold mb-4">
          {category.display} in Florida
        </h1>
        <p className="text-lg mb-8">
          Find the best wedding {category.display.toLowerCase()} in major Florida cities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <div
            key={city}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-4">{city}</h2>
            <p className="text-gray-600 mb-4">
              Discover top wedding {category.display.toLowerCase()} in {city}, Florida.
            </p>
            <div className="mt-auto">
              <Link
                href={`/city/${city.toLowerCase()}?category=${category.display.toLowerCase()}`}
                className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                View {category.display} in {city}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 