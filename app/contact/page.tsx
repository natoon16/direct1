import React from 'react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg mb-6">
            Have questions about Wedding Directory Florida? We're here to help! Fill out the form below and we'll get back to you as soon as possible.
          </p>
          
          <div className="bg-purple-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <ul className="space-y-3">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:info@weddingdirectoryflorida.com" className="text-purple-600 hover:text-purple-800">
                  info@weddingdirectoryflorida.com
                </a>
              </li>
              <li>
                <strong>Location:</strong> Florida, USA
              </li>
              <li>
                <strong>Hours:</strong> Monday - Friday, 9am - 5pm EST
              </li>
            </ul>
          </div>
        </div>

        <div>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 