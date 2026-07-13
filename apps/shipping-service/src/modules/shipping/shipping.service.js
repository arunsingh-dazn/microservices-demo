import { randomUUID } from "crypto";

import { NotFoundError, publishEvent, TOPICS } from "@microservices-demo/shared";

import { SHIPPING_MESSAGES, SHIPPING_STATUS } from "./shipping.constants.js";
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

    async shipShipment(id) {
      const shipment = await repository.updateStatus(id, SHIPPING_STATUS.SHIPPED);

      if (!shipment) {
        throw new NotFoundError(SHIPPING_MESSAGES.SHIPMENT_NOT_FOUND);
      }

      await publishEvent(TOPICS.SHIPMENT_SHIPPED, {
        shipmentId: shipment._id.toString(),
        orderId: shipment.orderId.toString(),
        userId: shipment.userId.toString(),
        trackingNumber: shipment.trackingNumber,
        carrier: shipment.carrier,
        status: shipment.status,
      });

      console.log("📤 SHIPMENT_SHIPPED Published");

      return toShipmentResponse(shipment);
    },

    async outForDelivery(id) {
      const shipment = await repository.updateStatus(id, SHIPPING_STATUS.OUT_FOR_DELIVERY);

      if (!shipment) {
        throw new NotFoundError(SHIPPING_MESSAGES.SHIPMENT_NOT_FOUND);
      }

      await publishEvent(TOPICS.SHIPMENT_OUT_FOR_DELIVERY, {
        shipmentId: shipment._id.toString(),
        orderId: shipment.orderId.toString(),
        userId: shipment.userId.toString(),
        trackingNumber: shipment.trackingNumber,
        carrier: shipment.carrier,
        status: shipment.status,
      });

      console.log("📤 SHIPMENT_OUT_FOR_DELIVERY Published");

      return toShipmentResponse(shipment);
    },

    async deliverShipment(id) {
      const shipment = await repository.updateStatus(id, SHIPPING_STATUS.DELIVERED);

      if (!shipment) {
        throw new NotFoundError(SHIPPING_MESSAGES.SHIPMENT_NOT_FOUND);
      }

      await publishEvent(TOPICS.SHIPMENT_DELIVERED, {
        shipmentId: shipment._id.toString(),
        orderId: shipment.orderId.toString(),
        userId: shipment.userId.toString(),
        trackingNumber: shipment.trackingNumber,
        carrier: shipment.carrier,
        status: shipment.status,
      });

      console.log("📤 SHIPMENT_DELIVERED Published");

      return toShipmentResponse(shipment);
    },
  };
}
