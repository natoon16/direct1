import { cities } from '../../../data/cities';
import { categories } from '../../../data/keywords';
import VendorCard from '../../../components/VendorCard';
import { Place } from '../../../lib/places';

export async function generateStaticParams() {
  const params = [];
  for (const city of cities) {
    for (const category of categories) {
      params.push({
        city: city.name.toLowerCase(),
        category: category.slug.toLowerCase(),
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
  const city = cities.find(
    (c) => c.name.toLowerCase() === params.city.toLowerCase()
  );
  const category = categories.find(
    (c) => c.slug.toLowerCase() === params.category.toLowerCase()
  );

  if (!city || !category) {
    return <div>Page not found</div>;
  }

  // Create a sample place that matches the Place interface
  const sampleVendor: Place = {
    place_id: "sample-" + city.name.toLowerCase() + "-" + category.slug.toLowerCase(),
    name: "Sample " + category.title + " Vendor in " + city.name,
    formatted_address: city.name + ", FL",
    geometry: {
      location: {
        lat: 28.5383,  // Orlando's coordinates as default
        lng: -81.3792
      }
    },
    rating: 5,
    user_ratings_total: 25,
    photos: ["/placeholder-vendor.jpg"],
    types: [category.slug.toLowerCase()],
    business_status: "OPERATIONAL"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">
        {category.title} in {city.name}, Florida
      </h1>
      <p className="mb-8 text-lg text-gray-600">
        Find the best {category.title.toLowerCase()} vendors and services for your wedding in {city.name}, Florida. Browse through our curated list of local wedding professionals.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for vendor cards - will be replaced with actual data */}
        <VendorCard
          vendor={sampleVendor}
        />
      </div>
    </div>
  );
} 