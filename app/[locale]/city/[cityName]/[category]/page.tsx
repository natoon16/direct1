import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export default async function CategoryPage({
  params: { cityName, category, locale }
}: {
  params: { cityName: string; category: string; locale: string }
}) {
  const t = await getTranslations('Categories');

  // These values should not be translated as they are proper nouns
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

// Generate static params for the categories we know about
export async function generateStaticParams() {
  // This should match your actual categories and cities
  const cities = ['jupiter']; // Add more cities as needed
  const categories = ['coordinators', 'dance-lessons', 'alterations', 'decor'];
  
  const params = [];
  
  for (const city of cities) {
    for (const category of categories) {
      params.push({
        cityName: city,
        category: category
      });
    }
  }
  
  return params;
} 