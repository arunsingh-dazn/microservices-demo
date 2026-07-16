import { logger, publishEvent, TOPICS } from "@microservices-demo/shared";

import service from "../modules/shipping/index.js";

export async function handleOrderConfirmed(order) {
  console.log("");
  console.log("================================");
  console.log("🚚 Shipping Service");
  console.log("================================");

  logger.info({
    message: "Received ORDER_CONFIRMED",
    service: "shipping-service",
    event: "ORDER_CONFIRMED",
    correlationId: order.correlationId,
    orderId: order.orderId,
    userId: order.userId,
  });

  const shipment = await service.createShipment({
    orderId: order.orderId,
    userId: order.userId,
    correlationId: order.correlationId,
  });

  logger.info({
    message: "Shipment created successfully",
    service: "shipping-service",
    event: "SHIPMENT_CREATED",
    correlationId: order.correlationId,
    shipmentId: shipment._id.toString(),
    orderId: shipment.orderId.toString(),
    userId: shipment.userId.toString(),
    carrier: shipment.carrier,
    trackingNumber: shipment.trackingNumber,
  });

  await publishEvent(
    TOPICS.SHIPMENT_CREATED,
    {
      shipmentId: shipment._id.toString(),
      orderId: shipment.orderId.toString(),
      userId: shipment.userId.toString(),
      trackingNumber: shipment.trackingNumber,
      carrier: shipment.carrier,
      status: shipment.status,
      estimatedDelivery: shipment.estimatedDelivery,
    },
    order.correlationId,
  );

  logger.info({
    message: "SHIPMENT_CREATED Published",
    service: "shipping-service",
    event: "SHIPMENT_CREATED",
    correlationId: order.correlationId,
    shipmentId: shipment._id.toString(),
    orderId: shipment.orderId.toString(),
    userId: shipment.userId.toString(),
  });

  console.log("================================");
  console.log("");
}
