import { connectToDatabase } from './mongodb'
import { City } from '@/types/City'
import { WithId, Document } from 'mongodb'

// Helper function to convert city name to URL-friendly format
function cityNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

// Helper function to convert URL-friendly format back to city name
export function slugToCityName(slug: string): string {
  return slug.toLowerCase().split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

export async function getAllCities(): Promise<City[]> {
  const { db } = await connectToDatabase()
  
  if (!db) {
    throw new Error('Database connection failed')
  }

  const cities = await db.collection('cities').find({}).toArray()
  return cities.map(city => ({
    _id: city._id.toString(),
    name: city.name as string,
    state: city.state as string,
    zipCodeRange: city.zipCodeRange as string
  }))
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  const { db } = await connectToDatabase()
  
  if (!db) {
    throw new Error('Database connection failed')
  }

  // Convert slug to city name format
  const cityName = slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
  
  const city = await db.collection('cities').findOne({ 
    name: { $regex: new RegExp(`^${cityName}$`, 'i') }
  })

  if (!city) {
    return null
  }

  return {
    _id: city._id.toString(),
    name: city.name as string,
    state: city.state as string,
    zipCodeRange: city.zipCodeRange as string
  }
} 