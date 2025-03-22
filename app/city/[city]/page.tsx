import React from 'react';
import { getVendors } from '../../../lib/mongodb';
import { notFound } from 'next/navigation';
import { cities } from '../../../data/cities';

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
  // Validate city exists in our list
  const cityName = decodeURIComponent(params.city);
  const normalizedCity = cities.find(
    c => c.toLowerCase() === cityName.toLowerCase()
  );

  if (!normalizedCity) {
    notFound();
  }

  // Get vendors from MongoDB (which will fetch from Google Places if needed)
  const vendors = await getVendors(normalizedCity, searchParams.category);

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
          {vendors.map((vendor: Vendor) => (
            <div key={vendor.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              {vendor.photo && (
                <div className="h-48 w-full bg-gray-200">
                  <img
                    src={vendor.photo}
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
                    className="text-purple-600 hover:text-purple-800"
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