import { Place } from '../lib/places';
import { StarIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

interface VendorCardProps {
  vendor: Place;
}

export default function VendorCard({ vendor }: VendorCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white">
      {vendor.photos && vendor.photos.length > 0 ? (
        <div className="relative h-48 w-full">
          <Image
            src={vendor.photos[0]}
            alt={vendor.name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No image available</span>
        </div>
      )}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-xl font-semibold text-gray-900">{vendor.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{vendor.formatted_address}</p>
        {vendor.rating && (
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={`${
                    vendor.rating && rating < Math.floor(vendor.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  } h-5 w-5 flex-shrink-0`}
                />
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-500">
              {vendor.user_ratings_total ? `(${vendor.user_ratings_total} reviews)` : ''}
            </p>
          </div>
        )}
        {vendor.website && (
          <a
            href={vendor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-sm text-blue-600 hover:text-blue-800"
          >
            Visit Website
          </a>
        )}
      </div>
    </div>
  );
} 