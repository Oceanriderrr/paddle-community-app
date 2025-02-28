import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
console.log("MONGODB_URI:", uri);
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    try {
      console.log("Attempting to connect to MongoDB...");
      global._mongoClientPromise = client.connect();
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection failed:", error);
      throw error; // Rethrow to see full stack trace
    }
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;