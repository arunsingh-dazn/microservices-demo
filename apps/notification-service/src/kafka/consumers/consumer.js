import { createConsumer, TOPICS } from "@microservices-demo/shared";

import { handleUserCreated } from "../events/user-created.handler.js";
import { handleOrderCreated } from "../events/order-created.handler.js";
import { handleShipmentCreated } from "../events/shipment-created.handler.js";

export async function startConsumer() {
  const consumer = await createConsumer("notification-group");

  await consumer.subscribe({
    topic: TOPICS.USER_CREATED,
    fromBeginning: false,
  });

  await consumer.subscribe({
    topic: TOPICS.ORDER_CREATED,
    fromBeginning: false,
  });

  await consumer.subscribe({
    topic: TOPICS.SHIPMENT_CREATED,
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const payload = JSON.parse(message.value.toString());

      switch (topic) {
        case TOPICS.USER_CREATED:
          await handleUserCreated(payload);
          break;

        case TOPICS.ORDER_CREATED:
          await handleOrderCreated(payload);
          break;

        case TOPICS.SHIPMENT_CREATED:
          await handleShipmentCreated(payload);
          break;

        default:
          console.log(`Unknown topic: ${topic}`);
      }
    },
  });
}
