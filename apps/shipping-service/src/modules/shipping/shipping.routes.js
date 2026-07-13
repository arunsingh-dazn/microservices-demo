import { Router } from "express";

export function createShippingRoutes(controller) {
  const router = Router();

  router.get("/", controller.getShipments);

  router.get("/:id", controller.getShipmentById);

  router.patch("/:id/ship", controller.shipShipment);

  router.patch("/:id/out-for-delivery", controller.outForDelivery);

  router.patch("/:id/deliver", controller.deliverShipment);

  return router;
}
