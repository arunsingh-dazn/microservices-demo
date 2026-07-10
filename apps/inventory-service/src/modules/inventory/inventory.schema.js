import { z } from "zod";

export const createInventorySchema = z.object({
  productId: z.string().trim().min(1),

  sku: z.string().trim().min(1),

  availableStock: z.number().int().nonnegative(),
});

export const updateInventorySchema = z.object({
  availableStock: z.number().int().nonnegative().optional(),

  reservedStock: z.number().int().nonnegative().optional(),
});
