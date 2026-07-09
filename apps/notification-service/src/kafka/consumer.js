import { createConsumer, TOPICS } from "@microservices-demo/shared";

export async function startConsumer() {
  const consumer = await createConsumer("notification-group");

  await consumer.subscribe({
    topic: TOPICS.USER_CREATED,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const payload = JSON.parse(message.value.toString());

      console.log("");
      console.log("================================");
      console.log("📧 Welcome Email Service");
      console.log("================================");
      console.log(payload);
      console.log("================================");
      console.log("");
    },
  });
}
