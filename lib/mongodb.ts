import mongoose from "mongoose";

// Extend the global object to include a cached mongoose connection
// This prevents multiple connections in development mode
declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// Initialize the cached connection object if it doesn't exist
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connects to the MongoDB database using Mongoose.
 * Caches the connection to prevent multiple connections during development.
 * @returns {Promise<mongoose.Connection>} The Mongoose connection instance
 * @throws {Error} If the MONGODB_URI environment variable is not set or connection fails
 */
async function connectDB(): Promise<mongoose.Connection> {
  // Return the cached connection if it exists
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // Disable mongoose buffering
    };

    // Ensure the MongoDB URI is provided
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      console.log("Connected to MongoDB");
      return mongooseInstance.connection;
    });
  }

  try {
    // Await the connection promise
    cached.conn = await cached.promise;
  } catch (e) {
    // Reset the promise on error to allow retry
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
