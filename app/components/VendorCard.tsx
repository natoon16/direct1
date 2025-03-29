'use client';

import { Vendor } from '../types/vendor';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';

interface VendorCardProps {
  vendor: Vendor;
}

export default function VendorCard({ vendor }: VendorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {vendor.name}
        </h3>
        
        {vendor.rating && (
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(vendor.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {vendor.rating.toFixed(1)} ({vendor.reviewCount} reviews)
            </span>
          </div>
        )}

        {vendor.address && (
          <div className="flex items-start mb-2">
            <FaMapMarkerAlt className="w-5 h-5 text-gray-500 mt-1 mr-2 flex-shrink-0" />
            <p className="text-gray-600 text-sm">{vendor.address}</p>
          </div>
        )}

        {vendor.phone && (
          <div className="flex items-center mb-2">
            <FaPhone className="w-4 h-4 text-gray-500 mr-2" />
            <a
              href={`tel:${vendor.phone}`}
              className="text-purple-600 hover:text-purple-700 text-sm"
            >
              {vendor.phone}
            </a>
          </div>
        )}

        {vendor.email && (
          <div className="flex items-center mb-2">
            <FaEnvelope className="w-4 h-4 text-gray-500 mr-2" />
            <a
              href={`mailto:${vendor.email}`}
              className="text-purple-600 hover:text-purple-700 text-sm"
            >
              {vendor.email}
            </a>
          </div>
        )}

        {vendor.website && (
          <div className="flex items-center">
            <FaGlobe className="w-4 h-4 text-gray-500 mr-2" />
            <a
              href={vendor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-700 text-sm"
            >
              Visit Website
            </a>
          </div>
        )}
      </div>
    </div>
  );
} 