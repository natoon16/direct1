import { connectToDatabase } from './mongodb'
import { City } from '@/types/City'
import { WithId, Document } from 'mongodb'

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
    latitude: city.latitude as number,
    longitude: city.longitude as number
  }))
} 