import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { connectProducer, logger } from "@microservices-demo/shared";
import { startConsumer } from "./consumers/consumer.js";

const PORT = process.env.PORT;

async function bootstrap() {
  await connectDB();

  await connectProducer();

  await startConsumer();

  app.listen(PORT, () => {
    logger.info(`🚀 ${process.env.SERVICE_NAME} started on port ${PORT}`);
  });
}

bootstrap();
