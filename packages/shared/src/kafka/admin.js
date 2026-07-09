import { getKafka } from "./client.js";

export async function createTopics() {
  const admin = getKafka().admin();

  await admin.connect();

  await admin.createTopics({
    waitForLeaders: true,
    topics: [
      {
        topic: "user.created",
      },
    ],
  });

  console.log("✅ Kafka Topics Ready");

  await admin.disconnect();
}
