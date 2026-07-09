import { Kafka } from "kafkajs";

let kafkaClient;

export function getKafka() {
  if (!kafkaClient) {
    console.log("Kafka Broker:", process.env.KAFKA_BROKER);

    kafkaClient = new Kafka({
      clientId: "microservices-demo",
      brokers: [process.env.KAFKA_BROKER],
    });
  }

  return kafkaClient;
}
