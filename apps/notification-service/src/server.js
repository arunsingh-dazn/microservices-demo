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

    const consumer = await startConsumer();

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

      server.close(async () => {
        logger.info({
          message: "HTTP server closed",
          service: process.env.SERVICE_NAME,
        });

        if (consumer) {
          try {
            logger.info({
              message: "Disconnecting Kafka consumer",
              service: process.env.SERVICE_NAME,
            });

            await consumer.disconnect();

            logger.info({
              message: "Kafka consumer disconnected",
              service: process.env.SERVICE_NAME,
            });
          } catch (error) {
            logger.error({
              message: "Failed to disconnect Kafka consumer",
              service: process.env.SERVICE_NAME,
              error: error.message,
              stack: error.stack,
            });
          }
        }

        logger.info({
          message: "Shutdown completed",
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
