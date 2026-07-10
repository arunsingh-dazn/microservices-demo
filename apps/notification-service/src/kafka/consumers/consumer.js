import { createConsumer, TOPICS } from "@microservices-demo/shared";
import { handleUserCreated } from "../events/user-created.handler.js";
import { handleOrderCreated } from "../events/order-created.handler.js";

export async function startConsumer() {
  const consumer = await createConsumer("notification-group");

  await consumer.subscribe({
    topic: TOPICS.USER_CREATED,
    fromBeginning: true,
  });

  await consumer.subscribe({
    topic: TOPICS.ORDER_CREATED,
    fromBeginning: true,
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

        default:
          console.log(`Unknown topic: ${topic}`);
      }
    },
  });
}
