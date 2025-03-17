import { connectToDatabase } from './mongodb'
import { Category } from '@/types/Category'

export async function getAllCategories(): Promise<Category[]> {
  const { db } = await connectToDatabase()
  const categories = await db.collection('categories').find({}).toArray()
  return categories as Category[]
} 