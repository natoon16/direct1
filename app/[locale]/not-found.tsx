import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('description')}
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            {t('backHome')}
          </Link>
        </div>
      </div>
    </div>
  );
} 