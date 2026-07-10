import "dotenv/config";

import app from "./app.js";
import { connectDB } from "./config/db.js";

import { connectProducer, createTopics, logger, validateEnv } from "@microservices-demo/shared";
import { startConsumer } from "./consumers/consumer.js";

const PORT = process.env.PORT;

async function bootstrap() {
  try {
    validateEnv();

    await connectDB();

    await createTopics();

    await connectProducer();

    await startConsumer();

    app.listen(PORT, () => {
      logger.info(`🚀 ${process.env.SERVICE_NAME} started on port ${PORT}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

bootstrap();
