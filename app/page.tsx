import Link from 'next/link';
import SearchBox from './components/SearchBox';
import { cities } from './data/cities';
import { categories } from './data/keywords';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-purple-700 text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Find Wedding Vendors in Florida
          </h1>
          <p className="text-xl text-center mb-8">
            Discover and connect with the best wedding professionals in your area
          </p>
          <SearchBox />
        </div>
      </div>

      {/* Popular Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600">Find the best {category.title.toLowerCase()}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Cities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cities.slice(0, 8).map((city) => (
              <Link
                key={city.name}
                href={`/city/${city.name.toLowerCase()}`}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <h3 className="text-xl font-semibold mb-2">{city.name}</h3>
                <p className="text-gray-600">Wedding vendors in {city.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 