import VendorCard from '../../../components/VendorCard';
import { Place } from '../../../lib/places';
import { cities } from '../../../data/cities';
import { categories } from '../../../data/keywords';

export async function generateStaticParams() {
  const params = [];
  for (const cityData of cities) {
    for (const categoryData of categories) {
      params.push({
        city: cityData.name.toLowerCase(),
        category: categoryData.slug.toLowerCase(),
      });
    }
  }
  return params;
}

export default function CityAndCategoryPage({
  params,
}: {
  params: { city: string; category: string };
}) {
  const cityData = cities.find(
    (c: { name: string }) => c.name.toLowerCase() === params.city.toLowerCase()
  );
  const categoryData = categories.find(
    (c: { slug: string }) => c.slug.toLowerCase() === params.category.toLowerCase()
  );

  if (!cityData || !categoryData) {
    return <div>Page not found</div>;
  }

  // Create a sample place that matches the Place interface
  const sampleVendor: Place = {
    place_id: "sample-" + cityData.name.toLowerCase() + "-" + categoryData.slug.toLowerCase(),
    name: "Sample " + categoryData.title + " Vendor in " + cityData.name,
    formatted_address: cityData.name + ", FL",
    geometry: {
      location: {
        lat: 0,
        lng: 0
      }
    },
    rating: 4.5,
    user_ratings_total: 25,
    photos: ["/placeholder-vendor.jpg"],
    types: [categoryData.slug.toLowerCase()],
    business_status: "OPERATIONAL"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">
        {categoryData.title} in {cityData.name}, Florida
      </h1>
      <p className="mb-8 text-lg text-gray-600">
        Find the best {categoryData.title.toLowerCase()} vendors and services for your wedding in {cityData.name}, Florida. Browse through our curated list of local wedding professionals.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VendorCard vendor={sampleVendor} />
        {/* More vendor cards will be added here */}
      </div>
    </div>
  );
} 