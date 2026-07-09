import dotenv from "dotenv";

dotenv.config();
console.log("SERVER:", process.env.KAFKA_BROKER);

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { connectProducer, createTopics, logger, validateEnv } from "@microservices-demo/shared";

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  try {
    validateEnv();

    await connectDB();

    await createTopics();

    await connectProducer();

    app.listen(PORT, () => {
      logger.info(`🚀 ${process.env.SERVICE_NAME} started on port ${PORT}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

bootstrap();
