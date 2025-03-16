import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white/60 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4 sm:py-6">
          <div className="flex items-center">
            <Link href="/" className="gradient-text text-lg sm:text-xl font-bold">
              Florida Wedding Directory
            </Link>
          </div>
          <div className="ml-4 sm:ml-10 space-x-3 sm:space-x-6 lg:space-x-8">
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
      </nav>
    </header>
  );
} 