import React from 'react';
import Link from 'next/link';

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

export const metadata = {
  title: 'Wedding Categories - Wedding Directory Florida',
  description: 'Browse wedding vendors by category in Florida. Find photographers, venues, caterers, planners, and more for your special day.',
};

export default function CategoriesPage() {
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
              <span className="text-gray-700">Categories</span>
            </li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold mb-4">Wedding Vendor Categories</h1>
        <p className="text-lg mb-8">
          Browse wedding vendors by category. Find the perfect professionals for every aspect of your wedding day.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.slug}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-4">{category.display}</h2>
            <p className="text-gray-600 mb-4">
              Find the best {category.display.toLowerCase()} for your wedding in Florida.
            </p>
            <div className="mt-auto">
              <Link
                href={`/category/${category.slug}`}
                className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                View {category.display}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 