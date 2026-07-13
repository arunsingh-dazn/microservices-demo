import { Router } from "express";

export function createShippingRoutes(controller) {
  const router = Router();

  router.get("/", controller.getShipments);

  router.get("/:id", controller.getShipmentById);

  return router;
}
