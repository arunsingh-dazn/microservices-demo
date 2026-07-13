import { createConsumer, TOPICS } from "@microservices-demo/shared";
import { handlePaymentCompleted } from "../events/payment-completed.handler.js";

export async function startConsumer() {
  const consumer = await createConsumer("order-group");

  await consumer.subscribe({
    topics: [TOPICS.PAYMENT_COMPLETED],
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const payload = JSON.parse(message.value.toString());

      switch (topic) {
        case TOPICS.PAYMENT_COMPLETED:
          await handlePaymentCompleted(payload);
          break;
      }
    },
  });
}
