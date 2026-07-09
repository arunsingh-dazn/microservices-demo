import { getKafka } from "./client.js";

export function createConsumer(groupId) {
  return getKafka.consumer({
    groupId,
  });
}
