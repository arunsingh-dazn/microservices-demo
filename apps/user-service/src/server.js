import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { logger, validateEnv } from "@microservices-demo/shared";

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  try {
    validateEnv();

    await connectDB();

    app.listen(PORT, () => {
      logger.info(`🚀 ${process.env.SERVICE_NAME} started on port ${PORT}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

bootstrap();
