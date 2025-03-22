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

interface Vendor {
  name: string;
  address: string;
  rating?: number;
  website?: string;
  category?: string;
}

interface Props {
  params: { city: string };
  searchParams: { category?: string };
}

export default async function CityPage({ params, searchParams }: Props) {
  const cityName = decodeURIComponent(params.city);
  const normalizedCity = cities.find(
    c => c.toLowerCase() === cityName.toLowerCase()
  );

  if (!normalizedCity) {
    notFound();
  }

  // Find the category object based on the search param
  const categoryParam = searchParams.category?.toLowerCase() || '';
  const category = categoryParam.length > 0
    ? categories.find(c => c.slug === categoryParam)
    : undefined;

  console.log('Fetching vendors for:', normalizedCity, category?.slug);
  const vendors = await getVendors(normalizedCity, category?.slug);
  console.log('Found vendors:', vendors.length);

  const title = category 
    ? `Top 10 Best ${category.display} in ${normalizedCity}, Florida`
    : `Best Wedding Vendors in ${normalizedCity}, Florida`;

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
              <Link href="/cities" className="text-purple-600 hover:text-purple-800">
                Cities
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <span className="text-gray-700">{normalizedCity}</span>
              {category && (
                <>
                  <span className="mx-2 text-gray-500">/</span>
                  <span className="text-gray-700">{category.display}</span>
                </>
              )}
            </li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        
        <p className="text-lg mb-8">
          Discover the best {category ? `${category.display.toLowerCase()} vendors` : 'wedding vendors'} in {normalizedCity}, Florida.
        </p>
      </div>

      {vendors.length === 0 ? (
        <div className="py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">Explore Wedding Vendors in {normalizedCity}</h2>
            <p className="text-lg text-gray-600 mb-4">
              Browse our selection of wedding categories below:
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/city/${encodeURIComponent(normalizedCity)}?category=${cat.slug}`}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center"
              >
                <span className="text-purple-600 hover:text-purple-800">{cat.display}</span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {vendors.map((vendor: Vendor, index: number) => (
            <div 
              key={`${vendor.name}-${index}`} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{vendor.name}</h2>
                  <p className="text-gray-600 mb-2">{vendor.address}</p>
                  {vendor.rating && (
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1">{vendor.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                {vendor.website && (
                  <a
                    href={vendor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 