import { z } from "zod";

const envSchema = z.object({
  PORT: z.string(),
  SERVICE_NAME: z.string(),
  MONGO_URI: z.string(),
});

export const validateEnv = () => {
  envSchema.parse(process.env);
};
