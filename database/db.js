import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

export const connectDB = async () => {
  try {
    const connectionOptions = {
      dbName: DB_NAME,
      user: DB_USER,
      pass: DB_PASSWORD,
    };
    await mongoose.connect(DB_URL, connectionOptions);
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};
