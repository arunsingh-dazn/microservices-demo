import { createConsumer, TOPICS } from "@microservices-demo/shared";

import { handleOrderConfirmed } from "../events/order-confirmed.handler.js";

export async function startConsumer() {
  const consumer = await createConsumer("shipping-group");

  await consumer.subscribe({
    topics: [TOPICS.ORDER_CONFIRMED],
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const payload = JSON.parse(message.value.toString());

      switch (topic) {
        case TOPICS.ORDER_CONFIRMED:
          await handleOrderConfirmed(payload);
          break;

        default:
          console.log(`Unknown Topic: ${topic}`);
      }
    },
  });
}
