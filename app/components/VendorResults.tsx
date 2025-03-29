import { searchPlaces } from '../lib/places';
import VendorCard from './VendorCard';

interface VendorResultsProps {
  category: string;
  city: string;
}

export default async function VendorResults({ category, city }: VendorResultsProps) {
  try {
    const vendors = await searchPlaces(category, city);

    if (!vendors || vendors.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No vendors found for this category and city. Please try a different search.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return (
      <div className="text-center py-12">
        <p className="text-red-600">
          An error occurred while fetching vendors. Please try again later.
        </p>
      </div>
    );
  }
} 