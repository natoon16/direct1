import React from 'react';
import { getVendors } from '../../../lib/mongodb';
import { notFound } from 'next/navigation';
import { cities } from '../../../data/cities';

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

  console.log('Fetching vendors for:', normalizedCity, searchParams.category);
  const vendors = await getVendors(normalizedCity, searchParams.category);
  console.log('Found vendors:', vendors.length);

  const title = searchParams.category 
    ? `Top 10 Best ${searchParams.category} in ${normalizedCity}, Florida`
    : `Best Wedding Vendors in ${normalizedCity}, Florida`;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <nav className="text-sm mb-4" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="/" className="text-purple-600 hover:text-purple-800">Home</a>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <a href="/cities" className="text-purple-600 hover:text-purple-800">Cities</a>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <span className="text-gray-700">{normalizedCity}</span>
              {searchParams.category && (
                <>
                  <span className="mx-2 text-gray-500">/</span>
                  <span className="text-gray-700">{searchParams.category}</span>
                </>
              )}
            </li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        
        <p className="text-lg mb-8">
          Discover the best wedding vendors in {normalizedCity}, Florida. Our directory features top-rated professionals ready to make your special day perfect.
        </p>
      </div>

      {vendors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No vendors found. Please try a different category or city.
          </p>
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