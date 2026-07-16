import { createConsumer, TOPICS } from "@microservices-demo/shared";

import { handleInventoryReleased } from "../events/inventory-released.handler.js";
import { handleInventoryReservationFailed } from "../events/inventory-reservation-failed.handler.js";
import { handlePaymentCompleted } from "../events/payment-completed.handler.js";

export async function startConsumer() {
  const consumer = await createConsumer("order-group");

  await consumer.subscribe({
    topics: [
      TOPICS.PAYMENT_COMPLETED,
      TOPICS.INVENTORY_RESERVATION_FAILED,
      TOPICS.INVENTORY_RELEASED,
    ],
    fromBeginning: false,
  });

  consumer.run({
    eachMessage: async ({ topic, message }) => {
      const payload = JSON.parse(message.value.toString());

      switch (topic) {
        case TOPICS.PAYMENT_COMPLETED:
          await handlePaymentCompleted(payload);
          break;

        case TOPICS.INVENTORY_RESERVATION_FAILED:
          await handleInventoryReservationFailed(payload);
          break;

        case TOPICS.INVENTORY_RELEASED:
          await handleInventoryReleased(payload);
          break;

        default:
          console.log(`Unknown topic: ${topic}`);
      }
    },
  });

  return consumer;
}
