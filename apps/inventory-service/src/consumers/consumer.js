import { createConsumer, TOPICS } from "@microservices-demo/shared";

import { handleOrderCreated } from "../events/order-created.handler.js";
import { handleProductCreated } from "../events/product-created.handler.js";
import { handlePaymentFailed } from "../events/payment-failed.handler.js";

export async function startConsumer() {
  const consumer = await createConsumer("inventory-group");

  await consumer.subscribe({
    topic: TOPICS.ORDER_CREATED,
    fromBeginning: true,
  });

  await consumer.subscribe({
    topic: TOPICS.PRODUCT_CREATED,
    fromBeginning: true,
  });

  await consumer.subscribe({
    topic: TOPICS.PAYMENT_FAILED,
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const payload = JSON.parse(message.value.toString());

      switch (topic) {
        case TOPICS.ORDER_CREATED:
          await handleOrderCreated(payload);
          break;
        case TOPICS.PRODUCT_CREATED:
          await handleProductCreated(payload);
          break;
        case TOPICS.PAYMENT_FAILED:
          await handlePaymentFailed(payload);
          break;

        default:
          console.log(`Unknown Topic: ${topic}`);
      }
    },
  });
}
