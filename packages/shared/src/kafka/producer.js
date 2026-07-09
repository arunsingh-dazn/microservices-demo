import { getKafka } from "./client.js";

let kafkaProducer;
let connected = false;

export async function connectProducer() {
  if (connected) return;

  kafkaProducer = getKafka().producer();

  await kafkaProducer.connect();

  connected = true;

  console.log("✅ Kafka Producer Connected");
}

export async function publishEvent(topic, payload) {
  await kafkaProducer.send({
    topic,
    messages: [
      {
        value: JSON.stringify(payload),
      },
    ],
  });

  console.log(`📤 Event published to ${topic}`);
}
