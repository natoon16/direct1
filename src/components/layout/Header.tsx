'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/60 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4 sm:py-6">
          <div className="flex items-center">
            <Link href="/" className="gradient-text text-lg sm:text-xl font-bold">
              Florida Wedding Directory
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-rose-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger icon */}
            <svg
              className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Close icon */}
            <svg
              className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden sm:flex ml-4 sm:ml-10 space-x-3 sm:space-x-6 lg:space-x-8">
            <Link
              href="/cities"
              className="text-sm sm:text-base font-medium text-gray-600 hover:text-rose-600 transition-colors"
            >
              Cities
            </Link>
            <Link
              href="/categories"
              className="text-sm sm:text-base font-medium text-gray-600 hover:text-rose-600 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="text-sm sm:text-base font-medium text-gray-600 hover:text-rose-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-sm sm:text-base font-medium text-gray-600 hover:text-rose-600 transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/cities"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Cities
            </Link>
            <Link
              href="/categories"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Privacy
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 