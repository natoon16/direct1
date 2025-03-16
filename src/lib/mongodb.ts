import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return mongoose.connection;
  }

  try {
    const opts = {
      bufferCommands: true,
    };

    await mongoose.connect(MONGODB_URI, opts);
    
    isConnected = true;
    console.log('MongoDB connected successfully');
    
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export function getConnectionStatus() {
  return isConnected;
}

// Handle connection events
mongoose.connection.on('connected', () => {
  isConnected = true;
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.log('MongoDB disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
}); 