import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold text-center mb-8">
        Wedding Directory Florida
      </h1>
      
      <p className="text-xl text-center mb-8">
        Find the perfect vendors for your special day
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
        <Link href="/vendors" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">Browse Vendors →</h2>
          <p>Find photographers, venues, caterers, and more.</p>
        </Link>

        <Link href="/cities" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">Search by City →</h2>
          <p>Discover vendors in your area.</p>
        </Link>

        <Link href="/categories" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">View Categories →</h2>
          <p>Browse vendors by service type.</p>
        </Link>
      </div>
    </main>
  )
} 