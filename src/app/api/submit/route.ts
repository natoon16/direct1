import { connectToDatabase, getConnectionStatus } from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    const conn = await connectToDatabase();
    const data = await request.json();
    
    // Check connection status
    const status = await getConnectionStatus();
    if (status !== 1) {  // 1 means connected
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    // Process the submission
    // Add your submission logic here

    return NextResponse.json({ success: true, message: 'Data submitted successfully' });
  } catch (error) {
    console.error('Error in submit route:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit data', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 