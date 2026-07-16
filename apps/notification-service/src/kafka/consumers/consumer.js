import { createConsumer, TOPICS } from "@microservices-demo/shared";

import { handleOrderCreated } from "../events/order-created.handler.js";
import { handleShipmentCreated } from "../events/shipment-created.handler.js";
import { handleShipmentDelivered } from "../events/shipment-delivered.handler.js";
import { handleShipmentOutForDelivery } from "../events/shipment-out-for-delivery.handler.js";
import { handleShipmentShipped } from "../events/shipment-shipped.handler.js";
import { handleUserCreated } from "../events/user-created.handler.js";

export async function startConsumer() {
  const consumer = await createConsumer("notification-group");

  await consumer.subscribe({
    topics: [
      TOPICS.USER_CREATED,
      TOPICS.ORDER_CREATED,
      TOPICS.SHIPMENT_CREATED,
      TOPICS.SHIPMENT_SHIPPED,
      TOPICS.SHIPMENT_OUT_FOR_DELIVERY,
      TOPICS.SHIPMENT_DELIVERED,
    ],
    fromBeginning: false,
  });

  consumer.run({
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

        case TOPICS.SHIPMENT_SHIPPED:
          await handleShipmentShipped(payload);
          break;

        case TOPICS.SHIPMENT_OUT_FOR_DELIVERY:
          await handleShipmentOutForDelivery(payload);
          break;

        case TOPICS.SHIPMENT_DELIVERED:
          await handleShipmentDelivered(payload);
          break;

        default:
          console.log(`Unknown topic: ${topic}`);
      }
    },
  });

  return consumer;
}
