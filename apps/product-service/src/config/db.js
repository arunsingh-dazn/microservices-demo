import mongoose from "mongoose";
import { logger } from "@microservices-demo/shared";

export async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);

  logger.info("✅ MongoDB connected successfully.");
}
