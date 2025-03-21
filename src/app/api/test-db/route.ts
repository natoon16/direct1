import { connectToDatabase, getConnectionStatus } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    const connectionStatus = await getConnectionStatus();
    
    return NextResponse.json({
      status: 'success',
      message: 'MongoDB connection test successful',
      connectionStatus: connectionStatus
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to connect to MongoDB',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 