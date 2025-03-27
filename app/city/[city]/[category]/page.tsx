import { cities, City } from '../../../data/cities';
import { categories, Category } from '../../../data/keywords';
import { searchPlaces, PlaceData } from '../../../lib/places';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: Promise<{
    city: string;
    category: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { category, city } = resolvedParams;
  const formattedCategory = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `${formattedCategory} in ${formattedCity}, FL - Wedding Directory Florida`,
    description: `Find the best ${formattedCategory.toLowerCase()} for your wedding in ${formattedCity}, Florida. Browse reviews, photos, and contact information.`,
  };
}

export default async function CategoryCityPage({ params }: Props) {
  const resolvedParams = await params;
  const { category, city } = resolvedParams;
  
  // Format the category and city for display
  const formattedCategory = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  console.log('Searching with params:', {
    category: formattedCategory,
    city: formattedCity,
    originalCategory: category,
    originalCity: city
  });

  // Validate category and city
  const validCategory = categories.find(
    (c: Category) => c.slug.toLowerCase() === category.toLowerCase() ||
                    c.title.toLowerCase() === formattedCategory.toLowerCase()
  );

  const validCity = cities.find(
    (c: City) => c.name.toLowerCase() === formattedCity.toLowerCase()
  );

  console.log('Validation results:', {
    categoryValid: !!validCategory,
    cityValid: !!validCity,
    foundCategory: validCategory?.title,
    foundCity: validCity?.name
  });

  if (!validCategory || !validCity) {
    console.log('Invalid category or city, redirecting to 404');
    notFound();
  }

  // Use the validated category and city names for the search
  const places: PlaceData[] = await searchPlaces(
    validCategory.title,
    validCity.name
  );

  console.log(`Found ${places.length} places for ${validCategory.title} in ${validCity.name}`);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            {validCategory.title} in {validCity.name}, FL
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Find the perfect {validCategory.title.toLowerCase()} for your wedding
          </p>
        </div>

        {places.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {places.map((place) => (
              <div
                key={place.place_id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {place.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{place.address}</p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.round(place.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-gray-600">
                        ({place.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {place.website && (
                      <a
                        href={place.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Visit Website
                      </a>
                    )}
                    {place.phone && (
                      <a
                        href={`tel:${place.phone}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
                      >
                        {place.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No vendors found
            </h2>
            <p className="text-gray-600">
              We couldn't find any {validCategory.title.toLowerCase()} in {validCity.name}. Try searching in a different city or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 