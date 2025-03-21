import { connectToDatabase } from './mongodb'
import mongoose from 'mongoose'

export interface Category {
  name: string
  slug: string
  count?: number
}

export async function getAllCategories(): Promise<Category[]> {
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

    // Using mongoose aggregate to get categories
    const categories = await db.collection('places-cache')
      .aggregate([
        { $group: { 
          _id: "$category",
          count: { $sum: 1 }
        }},
        { $project: {
          _id: 0,
          name: "$_id",
          slug: { $toLower: "$_id" },
          count: 1
        }}
      ]).toArray() as Category[]

    return categories
      .filter((category: Category) => category.name) // Filter out any null categories
      .sort((a: Category, b: Category) => a.name.localeCompare(b.name))

  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
} 