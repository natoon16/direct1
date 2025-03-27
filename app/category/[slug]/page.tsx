import { categories, Category } from '../../../app/data/keywords';
import { notFound } from 'next/navigation';
import { searchPlaces, convertPlaceToVendor } from '../../../app/lib/places';
import VendorCard from '../../../app/components/VendorCard';
import { PlaceData } from '../../../app/lib/types';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c: Category) => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  // Get vendors for major cities in Florida
  const cities = ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Fort Lauderdale'];
  const allVendors = [];

  for (const city of cities) {
    const places = await searchPlaces(category.slug, city);
    const vendors = places.map((place: PlaceData) => convertPlaceToVendor(place, category.slug, city));
    allVendors.push(...vendors);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{category.title} in Florida</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>

      {allVendors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No vendors found for this category. Please try a different category or city.</p>
        </div>
      )}
    </div>
  );
} 