import { categories } from '@/data/keywords';
import VendorCard from '../../components/VendorCard';
import { Place } from '../../lib/places';

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug.toLowerCase(),
  }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categories.find(
    (c) => c.slug.toLowerCase() === params.category.toLowerCase()
  );

  if (!category) {
    return <div>Category not found</div>;
  }

  // Create a sample place that matches the Place interface
  const sampleVendor: Place = {
    place_id: "sample-" + category.slug.toLowerCase(),
    name: "Sample " + category.title + " Vendor",
    formatted_address: "Orlando, FL",
    geometry: {
      location: {
        lat: 28.5383,
        lng: -81.3792
      }
    },
    rating: 5,
    user_ratings_total: 25,
    photos: [{
      photo_reference: "sample-photo",
      height: 400,
      width: 600,
      html_attributions: []
    }],
    types: [category.slug.toLowerCase()],
    business_status: "OPERATIONAL"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">{category.title} in Florida</h1>
      <p className="mb-8 text-lg text-gray-600">
        Find the best {category.title.toLowerCase()} vendors and services for your wedding in Florida. Browse through our curated list of local wedding professionals.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Sample vendor card */}
        <VendorCard vendor={sampleVendor} />
      </div>
    </div>
  );
} 