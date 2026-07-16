import { z } from "zod";

export function validateEnv({ requireMongo = true } = {}) {
  const schema = z.object({
    PORT: z.string(),
    SERVICE_NAME: z.string(),

    ...(requireMongo
      ? {
          MONGO_URI: z.string(),
        }
      : {}),
  });

  return schema.parse(process.env);
}
