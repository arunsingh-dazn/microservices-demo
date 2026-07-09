import "dotenv/config";

import app from "./app.js";

import { logger } from "@microservices-demo/shared";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`🚀 ${process.env.SERVICE_NAME} started on port ${PORT}`);
});
