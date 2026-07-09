import { getKafka } from "./client.js";

export async function createConsumer(groupId) {
  const consumer = getKafka().consumer({
    groupId,
  });

  await consumer.connect();

  console.log("✅ Kafka Consumer Connected");

  return consumer;
}
