import logger from "../logger/logger.js";
import { getKafka } from "./client.js";

export async function createConsumer(groupId) {
  const consumer = getKafka().consumer({
    groupId,
  });

  await consumer.connect();

  logger.info({
    message: "Kafka consumer connected",
    service: process.env.SERVICE_NAME,
    groupId,
  });

  return consumer;
}
