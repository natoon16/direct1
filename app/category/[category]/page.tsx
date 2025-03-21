import { categories } from '@/data/keywords';
import VendorCard from '@/components/VendorCard';

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">{category.title} in Florida</h1>
      <p className="mb-8 text-lg text-gray-600">
        Find the best {category.title.toLowerCase()} vendors and services for your wedding in Florida. Browse through our curated list of local wedding professionals.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for vendor cards - will be replaced with actual data */}
        <VendorCard
          vendor={{
            name: "Sample " + category.title + " Vendor",
            address: "Orlando, FL",
            category: category.title,
            description: `Professional wedding ${category.title.toLowerCase()} services`,
            rating: 5,
            reviews: 25,
            photos: ["/placeholder-vendor.jpg"]
          }}
        />
      </div>
    </div>
  );
} 