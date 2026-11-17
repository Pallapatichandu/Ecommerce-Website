import mongoose from "mongoose";

let isConnected = false;

export const connetDB = async () => {
  try {
    if (isConnected && mongoose.connection.readyState === 1) {
      return;
    }

    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is missing in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URL);

    isConnected = true;

    console.log("MongoDB connected successfully");

  } catch (error) {
    isConnected = false;
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};