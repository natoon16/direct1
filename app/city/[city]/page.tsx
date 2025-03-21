import { cities } from '@/data/cities';
import VendorCard from '@/components/VendorCard';
import { Place } from '@/lib/places';

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Wedding Vendors in {city.name}</h1>
      <p className="mb-8 text-lg text-gray-600">
        Find the best wedding vendors and services in {city.name}, Florida. Browse through our curated list of local wedding professionals.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for vendor cards - will be replaced with actual data */}
        <VendorCard
          vendor={{
            name: "Sample Vendor",
            address: city.name + ", FL",
            category: "Photography",
            description: "Professional wedding photography services",
            rating: 5,
            reviews: 25,
            photos: ["/placeholder-vendor.jpg"]
          }}
        />
      </div>
    </div>
  );
} 