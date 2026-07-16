import { logger } from "@microservices-demo/shared";

export async function handleShipmentDelivered(event) {
  console.log("");
  console.log("================================");
  console.log("✅ Shipment Delivered");
  console.log("================================");

  logger.info({
    message: "Received SHIPMENT_DELIVERED",
    service: "notification-service",
    event: "SHIPMENT_DELIVERED",
    correlationId: event.correlationId,
    shipmentId: event.shipmentId,
    orderId: event.orderId,
    userId: event.userId,
  });

  console.log(`📦 Shipment : ${event.shipmentId}`);
  console.log(`🛒 Order    : ${event.orderId}`);

  console.log("");
  console.log("📧 Your order has been delivered.");

  logger.info({
    message: "Delivery notification sent",
    service: "notification-service",
    event: "DELIVERY_NOTIFICATION_SENT",
    correlationId: event.correlationId,
    shipmentId: event.shipmentId,
    orderId: event.orderId,
    userId: event.userId,
    notificationType: "EMAIL",
  });

  console.log("================================");
  console.log("");
}
