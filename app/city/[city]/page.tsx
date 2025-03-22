import React from 'react';
import { getVendors } from '../../../lib/mongodb';
import { notFound } from 'next/navigation';
import { cities } from '../../../data/cities';
import Image from 'next/image';

interface Vendor {
  name: string;
  address: string;
  rating?: number;
  website?: string;
  photo?: string;
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

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">
        {searchParams.category 
          ? `${searchParams.category} in ${normalizedCity}`
          : `Wedding Vendors in ${normalizedCity}`}
      </h1>
      
      <p className="text-lg mb-12">
        Discover the best wedding vendors in {normalizedCity}, Florida. Our directory features top-rated professionals ready to make your special day perfect.
      </p>

      {vendors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No vendors found. Please try a different category or city.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor: Vendor, index: number) => (
            <div key={`${vendor.name}-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {vendor.photo && (
                <div className="h-48 w-full bg-gray-200">
                  <img
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${vendor.photo}&key=${process.env.GOOGLE_PLACES_API_KEY}`}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{vendor.name}</h2>
                <p className="text-gray-600 mb-2">{vendor.address}</p>
                {vendor.rating && (
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{vendor.rating.toFixed(1)}</span>
                  </div>
                )}
                {vendor.website && (
                  <a
                    href={vendor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
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