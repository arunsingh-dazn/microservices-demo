import "dotenv/config";

import app from "./app.js";
import { logger, validateEnv } from "@microservices-demo/shared";
import { startConsumer } from "./kafka/consumers/consumer.js";

const PORT = process.env.PORT;

async function bootstrap() {
  try {
    validateEnv({
      requireMongo: false,
    });

    await startConsumer();

    const server = app.listen(PORT, () => {
      logger.info({
        message: "Service started successfully",
        service: process.env.SERVICE_NAME,
        port: PORT,
      });
    });

    async function shutdown(signal) {
      logger.info({
        message: "Shutting down service",
        service: process.env.SERVICE_NAME,
        signal,
      });

      server.close(() => {
        logger.info({
          message: "HTTP server closed",
          service: process.env.SERVICE_NAME,
        });

        process.exit(0);
      });
    }

    process.once("SIGINT", () => shutdown("SIGINT"));
    process.once("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    logger.error({
      message: "Failed to start service",
      service: process.env.SERVICE_NAME,
      error: error.message,
      stack: error.stack,
    });

    process.exit(1);
  }
}

bootstrap();
