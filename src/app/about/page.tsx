import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Florida Wedding Directory',
  description: 'Learn more about Florida Wedding Directory - your trusted source for finding the perfect wedding vendors across Florida.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-6 py-12 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="gradient-text text-4xl font-bold tracking-tight sm:text-5xl mb-8">
            About Florida Wedding Directory
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Welcome to Florida Wedding Directory, your premier destination for discovering exceptional wedding vendors and services across the Sunshine State. Our mission is to simplify the wedding planning process by connecting engaged couples with trusted professionals who can bring their dream wedding to life.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We strive to be the most comprehensive and user-friendly wedding vendor directory in Florida. Our platform is designed to help couples easily find and connect with qualified wedding professionals while providing vendors with a powerful platform to showcase their services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What We Offer</h2>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Comprehensive vendor listings across multiple categories</li>
              <li>Easy-to-use search functionality</li>
              <li>Coverage of all major Florida cities</li>
              <li>Verified vendor information</li>
              <li>Regular updates and fresh content</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Values</h2>
            <p className="text-gray-600 mb-6">
              We believe in:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Transparency in all our operations</li>
              <li>Quality over quantity in vendor listings</li>
              <li>Supporting local wedding businesses</li>
              <li>Providing accurate and up-to-date information</li>
              <li>Creating a stress-free wedding planning experience</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Coverage</h2>
            <p className="text-gray-600 mb-6">
              Our directory covers all major cities in Florida, from Jacksonville to Miami, and everywhere in between. We're constantly expanding our network to include more vendors and services across the state.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Join Our Community</h2>
            <p className="text-gray-600 mb-6">
              Whether you're planning your wedding or you're a vendor looking to reach more couples, Florida Wedding Directory is here to help. We're committed to making wedding planning easier and more enjoyable for everyone involved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 