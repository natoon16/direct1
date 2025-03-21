import { PlaceResult } from '@/models/PlaceCache';
import Link from 'next/link';

interface Props {
  vendor: PlaceResult;
}

export default function VendorCard({ vendor }: Props) {
  const rating = vendor.rating || 0;
  
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {vendor.displayName.text}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {vendor.formattedAddress}
        </p>
        {vendor.rating && (
          <div className="flex items-center gap-1 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(rating)
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
            <span className="text-sm text-gray-600">
              {rating.toFixed(1)} ({vendor.userRatingCount} reviews)
            </span>
          </div>
        )}
        {vendor.websiteUri && (
          <Link
            href={vendor.websiteUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-rose-600 hover:text-rose-500"
          >
            Visit Website
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
} 