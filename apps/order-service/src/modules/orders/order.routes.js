import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { createOrderSchema } from "./order.schema.js";

export function createOrderRoutes(controller) {
  const router = Router();

  router.post("/", authenticate, validate(createOrderSchema), controller.createOrder);

  router.get("/", authenticate, controller.getOrders);

  router.get("/:id", authenticate, controller.getOrderById);

  router.patch("/:id/cancel", authenticate, controller.cancelOrder);

  return router;
}
