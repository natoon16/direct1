import Link from 'next/link';
import { categories } from '@/data/keywords';
import { cities } from '@/data/cities';

export default function Footer() {
  // Get top 3 major cities for the footer
  const majorCities = cities.slice(0, 3);

  return (
    <footer className="bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="gradient-text text-sm font-semibold tracking-wider uppercase">
              Popular Categories
            </h3>
            <ul className="mt-4 space-y-4">
              {categories.slice(0, 3).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-base text-gray-500 hover:text-rose-600 transition-colors"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="gradient-text text-sm font-semibold tracking-wider uppercase">
              Major Cities
            </h3>
            <ul className="mt-4 space-y-4">
              {majorCities.map((city) => (
                <li key={city.name}>
                  <Link
                    href={`/city/${city.name.toLowerCase()}`}
                    className="text-base text-gray-500 hover:text-rose-600 transition-colors"
                  >
                    Wedding Services in {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="gradient-text text-sm font-semibold tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base text-gray-500 hover:text-rose-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-base text-gray-500 hover:text-rose-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-base text-gray-500 hover:text-rose-600 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} Florida Wedding Directory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 