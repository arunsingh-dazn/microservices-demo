import { getKafka } from "./client.js";
import { TOPICS } from "./topics.js";

export async function createTopics() {
  const admin = getKafka().admin();

  try {
    await admin.connect();

    const topics = Object.values(TOPICS).map((topic) => ({
      topic,
      numPartitions: 1,
      replicationFactor: 1,
    }));

    const created = await admin.createTopics({
      waitForLeaders: true,
      topics,
    });

    if (created) {
      console.log("✅ Kafka topics created successfully.");
    } else {
      console.log("ℹ️ Kafka topics already exist.");
    }
  } catch (error) {
    console.error("❌ Failed to create Kafka topics:", error.message);
    throw error;
  } finally {
    await admin.disconnect();
  }
}
