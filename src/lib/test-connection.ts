import mongoose from 'mongoose';
import { connectToDatabase } from './mongodb';

export async function testConnection() {
  try {
    const connection = await connectToDatabase();
    
    // Check if we have a valid database connection
    if (!mongoose.connection.db) {
      throw new Error('No database connection available');
    }

    // Test the connection with a ping command
    const result = await mongoose.connection.db.command({ ping: 1 });
    
    console.log('Connected to database:', mongoose.connection.db.databaseName);
    return { success: true, message: 'Database connection successful' };
  } catch (error) {
    console.error('Database connection test failed:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
} 