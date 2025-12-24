import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseConnection {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
}

// Global variable to cache the connection in development
let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGODB_URI) {
        throw new Error(
            'Please define the MONGODB_URI environment variable inside .env'
        );
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose.connection;
        });
    }

    try {
        cached.conn = await cached.promise;
        console.log('Connected to MongoDB');
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectToDatabase;
