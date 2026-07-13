import mongoose from "mongoose";
import { logger } from "@microservices-demo/shared";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    logger.info("✅ MongoDB connected successfully.");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}
