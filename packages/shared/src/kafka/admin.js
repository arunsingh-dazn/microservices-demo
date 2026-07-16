import logger from "../logger/logger.js";
import { getKafka } from "./client.js";
import { TOPICS } from "./topics.js";

export async function createTopics() {
  const admin = getKafka().admin();

  try {
    await admin.connect();

    logger.info({
      message: "Kafka admin connected",
      service: process.env.SERVICE_NAME,
    });

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
      logger.info({
        message: "Kafka topics created successfully",
        service: process.env.SERVICE_NAME,
        topics: Object.values(TOPICS),
      });
    } else {
      logger.info({
        message: "Kafka topics already exist",
        service: process.env.SERVICE_NAME,
      });
    }
  } catch (error) {
    logger.error({
      message: "Failed to create Kafka topics",
      service: process.env.SERVICE_NAME,
      error: error.message,
    });

    throw error;
  } finally {
    try {
      await admin.disconnect();

      logger.info({
        message: "Kafka admin disconnected",
        service: process.env.SERVICE_NAME,
      });
    } catch (error) {
      logger.error({
        message: "Failed to disconnect Kafka admin",
        service: process.env.SERVICE_NAME,
        error: error.message,
      });
    }
  }
}
