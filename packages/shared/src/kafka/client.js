import { Kafka } from "kafkajs";

let kafkaClient;

export function getKafka() {
  if (!kafkaClient) {
    kafkaClient = new Kafka({
      clientId: `${process.env.SERVICE_NAME}`,
      brokers: [process.env.KAFKA_BROKER],
    });
  }

  return kafkaClient;
}
