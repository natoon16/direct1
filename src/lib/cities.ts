import { connectToDatabase } from './mongodb'
import mongoose from 'mongoose'

export interface City {
  name: string
  state: string
  latitude: number
  longitude: number
  count?: number
}

export async function getAllCities(): Promise<City[]> {
  try {
    await connectToDatabase()
    
    const connection = mongoose.connection
    if (!connection.readyState) {
      throw new Error('Database connection not established')
    }

    const db = connection.db
    if (!db) {
      throw new Error('Database not initialized')
    }

    // Using mongoose aggregate to get cities
    const cities = await db.collection('places-cache')
      .aggregate([
        { $group: { 
          _id: "$city",
          state: { $first: "$state" },
          latitude: { $first: "$latitude" },
          longitude: { $first: "$longitude" },
          count: { $sum: 1 }
        }},
        { $project: {
          _id: 0,
          name: "$_id",
          state: 1,
          latitude: 1,
          longitude: 1,
          count: 1
        }}
      ]).toArray() as City[]

    return cities
      .filter((city: City) => city.name) // Filter out any null cities
      .sort((a: City, b: City) => a.name.localeCompare(b.name))

  } catch (error) {
    console.error('Error fetching cities:', error)
    return []
  }
} 