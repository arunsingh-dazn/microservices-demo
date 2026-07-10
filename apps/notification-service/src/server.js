import "dotenv/config";
import app from "./app.js";
import { logger } from "@microservices-demo/shared";
import { startConsumer } from "./kafka/consumers/consumer.js";

const PORT = process.env.PORT;

async function bootstrap() {
  await startConsumer();

  app.listen(PORT, () => {
    logger.info(`🚀 ${process.env.SERVICE_NAME} started on ${PORT}`);
  });
}

bootstrap();
