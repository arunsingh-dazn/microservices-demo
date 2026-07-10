import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";

import { createInventorySchema } from "./inventory.schema.js";
import { authenticate } from "../../middleware/authenticate.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

export function createInventoryRoutes(controller) {
  const router = Router();

  router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate(createInventorySchema),
    controller.createInventory,
  );

  router.get("/", authenticate, controller.getInventories);

  router.get("/:productId", authenticate, controller.getInventoryByProductId);

  router.patch("/:productId/reserve", authenticate, authorize("ADMIN"), controller.reserveStock);

  router.patch("/:productId/release", authenticate, authorize("ADMIN"), controller.releaseStock);

  return router;
}
