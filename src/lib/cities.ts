import { connectToDatabase } from './mongodb'
import { City } from '@/types/City'

export async function getAllCities(): Promise<City[]> {
  const { db } = await connectToDatabase()
  
  if (!db) {
    throw new Error('Database connection failed')
  }

  const cities = await db.collection('cities').find({}).toArray()
  return cities as City[]
} 