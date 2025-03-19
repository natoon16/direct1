import { getAllCities } from '@/lib/cities'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Florida Wedding Vendors by City - Florida Wedding Directory',
  description: 'Find wedding vendors in cities across Florida. Browse photographers, venues, planners, florists, and more in your area.',
}

export default async function CitiesPage() {
  const cities = await getAllCities()

  // Sort cities alphabetically
  const sortedCities = [...cities].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Florida Wedding Vendors by City
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Find wedding vendors in your city. Browse through our comprehensive directory 
          of wedding professionals across Florida.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCities.map((city) => (
            <Link
              key={city._id}
              href={`/city/${city.slug}`}
              className="p-4 border border-gray-200 rounded-lg hover:border-rose-500 transition-colors"
            >
              <h2 className="text-lg font-medium text-gray-900">
                {city.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Wedding Vendors in {city.name}, FL
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
} 