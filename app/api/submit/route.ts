import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';

export async function POST(request: Request) {
  try {
    // Connect to MongoDB using Mongoose
    const mongoose = await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error('Database not connected');

    const collection = db.collection('submissions');

    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Add timestamp
    const submission = {
      ...data,
      timestamp: new Date(),
    };

    // Insert the submission
    await collection.insertOne(submission);

    return NextResponse.json(
      { message: 'Submission received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 