import { createConsumer, TOPICS } from "@microservices-demo/shared";
import { handlePaymentCompleted } from "../events/payment-completed.handler.js";
import { handleInventoryReservationFailed } from "../events/inventory-reservation-failed.handler.js";
import { handleInventoryReleased } from "../events/inventory-released.handler.js";

export async function startConsumer() {
  const consumer = await createConsumer("order-group");

  await consumer.subscribe({
    topics: [TOPICS.PAYMENT_COMPLETED],
    fromBeginning: false,
  });

  await consumer.subscribe({
    topics: [TOPICS.PAYMENT_COMPLETED, TOPICS.INVENTORY_RESERVATION_FAILED],
    fromBeginning: false,
  });

  await consumer.subscribe({
    topic: TOPICS.INVENTORY_RELEASED,
    fromBeginning: false,
  });

  await consumer.run({
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
      }
    },
  });
}
