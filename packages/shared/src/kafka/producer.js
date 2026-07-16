import logger from "../logger/logger.js";
import { getKafka } from "./client.js";

let kafkaProducer;
let connected = false;

export async function connectProducer() {
  if (connected) return;

  kafkaProducer = getKafka().producer();

  await kafkaProducer.connect();

  connected = true;

  logger.info({
    message: "Kafka producer connected",
    service: process.env.SERVICE_NAME,
  });
}

export async function publishEvent(topic, payload, correlationId = null) {
  if (!connected) {
    await connectProducer();
  }

  await kafkaProducer.send({
    topic,
    messages: [
      {
        headers: {
          correlationId: String(correlationId ?? ""),
          service: String(process.env.SERVICE_NAME),
        },
        value: JSON.stringify({
          ...payload,
          correlationId,
        }),
      },
    ],
  });

  logger.info({
    message: "Kafka event published",
    service: process.env.SERVICE_NAME,
    event: topic,
    correlationId,
  });
}

export async function disconnectProducer() {
  if (!connected || !kafkaProducer) {
    return;
  }

  await kafkaProducer.disconnect();

  kafkaProducer = null;
  connected = false;

  logger.info({
    message: "Kafka producer disconnected",
    service: process.env.SERVICE_NAME,
  });
}
