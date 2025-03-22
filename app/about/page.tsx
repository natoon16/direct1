import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">About Wedding Directory Florida</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          Welcome to Wedding Directory Florida, your premier destination for finding the perfect wedding vendors across the Sunshine State. We're dedicated to making your wedding planning journey as smooth and enjoyable as possible.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="text-lg mb-6">
          Our mission is to connect engaged couples with trusted wedding professionals throughout Florida. We carefully curate our directory to ensure you have access to the best vendors in every category, from photographers and florists to venues and caterers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us</h2>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>Comprehensive directory of local wedding vendors</li>
          <li>Easy-to-use search functionality</li>
          <li>Detailed vendor profiles with photos and reviews</li>
          <li>Coverage across all major Florida cities</li>
          <li>Free resource for engaged couples</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">For Vendors</h2>
        <p className="text-lg mb-6">
          Are you a wedding vendor in Florida? Join our directory to showcase your services to engaged couples in your area. List your business with us to increase your visibility and connect with couples planning their special day.
        </p>
      </div>
    </div>
  );
} 