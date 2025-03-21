import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Not Found - Wedding Directory Florida',
  description: 'The search criteria you entered was not found. Please try searching with a valid category and city from our directory.',
};

export default function SearchNotFound() {
  return (
    <div className="bg-white min-h-[60vh] flex items-center">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Search Not Found
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We couldn't find any results matching your search criteria. Please make sure to:
          </p>
          <ul className="mt-4 text-left text-gray-600 inline-block">
            <li className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Select from our list of available categories
            </li>
            <li className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Choose from our Florida cities directory
            </li>
          </ul>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/cities"
              className="rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
            >
              Browse Cities
            </Link>
            <Link
              href="/"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 