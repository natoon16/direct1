import { Place } from '@/lib/places';
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

      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">
            {vendor.name}
          </h3>
          
          <div className="mt-2 flex items-center">
            {vendor.rating && (
              <>
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="ml-1 text-sm text-gray-600">
                  {vendor.rating.toFixed(1)}
                </span>
              </>
            )}
          </div>

          <p className="mt-3 text-sm text-gray-500">
            {vendor.address}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-4">
          {vendor.website && (
            <a
              href={vendor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Visit Website
            </a>
          )}
          {vendor.phone && (
            <a
              href={`tel:${vendor.phone}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              {vendor.phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 