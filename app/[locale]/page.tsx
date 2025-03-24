import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('common');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to Wedding Directory Florida
        </h1>
        <p className="text-lg text-gray-600">
          Find the perfect wedding vendors in Florida
        </p>
      </div>
    </div>
  );
} 