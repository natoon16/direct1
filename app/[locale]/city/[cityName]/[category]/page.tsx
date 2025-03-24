import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// Define our known cities and categories
const CITIES = ['jupiter', 'boca raton', 'palm beach', 'west palm beach', 'delray beach', 'boynton beach'];
const CATEGORIES = [
  'coordinators',
  'dance-lessons',
  'alterations',
  'decor',
  'djs',
  'florists',
  'venues',
  'catering',
  'photography',
  'videography',
  'makeup',
  'hair',
  'transportation',
  'rentals'
];

export default async function CategoryPage({
  params: { cityName, category, locale }
}: {
  params: { cityName: string; category: string; locale: string }
}) {
  const t = await getTranslations('Categories');

  // Keep proper nouns untranslated
  const cityNameUntranslated = cityName;
  const categoryUntranslated = category;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {t('vendors.in', {
          category: categoryUntranslated,
          city: cityNameUntranslated
        })}
      </h1>
      {/* Vendor list will be added here - vendors' names and details remain untranslated */}
    </div>
  );
}

// Generate static params for all known cities and categories
export async function generateStaticParams() {
  const params = [];
  
  for (const city of CITIES) {
    for (const category of CATEGORIES) {
      params.push({
        cityName: city,
        category: category
      });
    }
  }
  
  return params;
} 