import { notFound } from 'next/navigation';
import { cities } from '../../../data/cities';
import { categories } from '../../../data/keywords';
import { vendors } from '../../../data/vendors';
import VendorCard from '../../../components/VendorCard';
import { Metadata } from 'next';

interface CityCategoryPageProps {
  params: Promise<{
    city: string;
    category: string;
  }>;
}

export async function generateMetadata({ params }: CityCategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const cityName = resolvedParams.city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const categoryTitle = resolvedParams.category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${categoryTitle} in ${cityName}, FL - Wedding Directory Florida`,
    description: `Find the best ${categoryTitle.toLowerCase()} for your wedding in ${cityName}, Florida. Browse reviews, photos, and contact information.`,
  };
}

export default async function CityCategoryPage({ params }: CityCategoryPageProps) {
  const resolvedParams = await params;
  
  // Convert URL slugs to proper format
  const cityName = resolvedParams.city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const categorySlug = resolvedParams.category;

  // Validate city and category
  const city = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
  const category = categories.find(
    c => c.slug.toLowerCase() === categorySlug.toLowerCase() ||
        c.title.toLowerCase().replace(/\s+/g, '-') === categorySlug.toLowerCase()
  );

  if (!city || !category) {
    notFound();
  }

  // Filter vendors by city and category
  const filteredVendors = vendors.filter(
    vendor => 
      vendor.city.toLowerCase() === cityName.toLowerCase() &&
      vendor.category.toLowerCase() === category.title.toLowerCase()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        {category.title} in {cityName}, FL
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Find the perfect {category.title.toLowerCase()} for your wedding
      </p>

      {filteredVendors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">No vendors found</h2>
          <p className="text-gray-600">
            We couldn't find any {category.title.toLowerCase()} in {cityName}. Try searching in a different city or category.
          </p>
        </div>
      )}
    </div>
  );
} 