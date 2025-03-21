import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-purple-100 py-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-purple-600">
              Wedding Directory FL
            </Link>
          </div>
          <div className="ml-10 hidden space-x-8 lg:block">
            <Link
              href="/cities"
              className="text-base font-medium text-gray-600 hover:text-purple-600"
            >
              Cities
            </Link>
            <Link
              href="/categories"
              className="text-base font-medium text-gray-600 hover:text-purple-600"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="text-base font-medium text-gray-600 hover:text-purple-600"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-base font-medium text-gray-600 hover:text-purple-600"
            >
              Contact
            </Link>
          </div>
          <div className="ml-10 space-x-4">
            <Link
              href="/vendors/register"
              className="inline-block rounded-md border border-purple-600 px-4 py-2 text-base font-medium text-purple-600 hover:bg-purple-50"
            >
              List Your Business
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          <Link
            href="/cities"
            className="text-base font-medium text-gray-600 hover:text-purple-600"
          >
            Cities
          </Link>
          <Link
            href="/categories"
            className="text-base font-medium text-gray-600 hover:text-purple-600"
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="text-base font-medium text-gray-600 hover:text-purple-600"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-base font-medium text-gray-600 hover:text-purple-600"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
} 