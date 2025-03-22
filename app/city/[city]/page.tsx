import { cities } from '@/data/cities';
import VendorCard from '../../components/VendorCard';
import { Place } from '../../lib/places';

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.name.toLowerCase(),
  }));
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = cities.find(
    (c) => c.name.toLowerCase() === params.city.toLowerCase()
  );

  if (!city) {
    return <div>City not found</div>;
  }

  // Create a sample place that matches the Place interface
  const sampleVendor: Place = {
    place_id: "sample-" + city.name.toLowerCase(),
    name: "Sample Vendor in " + city.name,
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
    types: ["wedding_vendor"],
    business_status: "OPERATIONAL"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Wedding Vendors in {city.name}</h1>
      <p className="mb-8 text-lg text-gray-600">
        Find the best wedding vendors and services in {city.name}, Florida. Browse through our curated list of local wedding professionals.
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