import { createConsumer, TOPICS } from "@microservices-demo/shared";
import { handleInventoryReserved } from "../events/inventory-reserved.handler.js";

export async function startConsumer() {
  const consumer = await createConsumer("payment-group");

  await consumer.subscribe({
    topics: [TOPICS.INVENTORY_RESERVED],
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const payload = JSON.parse(message.value.toString());

      switch (topic) {
        case TOPICS.INVENTORY_RESERVED:
          await handleInventoryReserved(payload);
          break;
      }
    },
  });
}
