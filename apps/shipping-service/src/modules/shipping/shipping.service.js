import { randomUUID } from "crypto";
import { NotFoundError } from "@microservices-demo/shared";

import { SHIPPING_MESSAGES } from "./shipping.constants.js";
import { toShipmentResponse } from "./shipping.mapper.js";

export function createShippingService(repository) {
  return {
    async createShipment(payload) {
      const shipment = await repository.create({
        ...payload,
        trackingNumber: randomUUID(),
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      });

      return shipment;
    },

    async getShipments() {
      const shipments = await repository.findAll();

      return shipments.map(toShipmentResponse);
    },

    async getShipmentById(id) {
      const shipment = await repository.findById(id);

      if (!shipment) {
        throw new NotFoundError(SHIPPING_MESSAGES.SHIPMENT_NOT_FOUND);
      }

      return toShipmentResponse(shipment);
    },
  };
}
