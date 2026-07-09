import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(2).max(100),

  description: z.string().optional(),

  sku: z.string().trim().min(3).max(50),

  price: z.number().positive(),

  stock: z.number().int().min(0),

  category: z.string().optional(),

  image: z.string().optional(),

  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const updateProductSchema = createProductSchema.partial();
