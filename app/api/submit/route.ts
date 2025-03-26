import clientPromise, { checkConnection } from '../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Check database connection first
    const connectionStatus = await checkConnection();
    if (!connectionStatus.isConnected) {
      console.error('Database connection failed:', connectionStatus.error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Database connection failed' 
        },
        { status: 503 }
      );
    }

    const client = await clientPromise;
    const db = client.db('wedding-directory');
    const collection = db.collection('submissions');

    const data = await request.json();
    
    // Add timestamp to the submission
    const submission = {
      ...data,
      timestamp: new Date(),
    };

    await collection.insertOne(submission);

    return NextResponse.json({ 
      success: true, 
      message: 'Submission received successfully' 
    });
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to save submission' 
      },
      { status: 500 }
    );
  }
} 