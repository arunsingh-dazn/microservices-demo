import { logger } from "@microservices-demo/shared";

export async function handleShipmentShipped(event) {
  console.log("");
  console.log("================================");
  console.log("🚚 Shipment Shipped");
  console.log("================================");

  logger.info({
    message: "Received SHIPMENT_SHIPPED",
    service: "notification-service",
    event: "SHIPMENT_SHIPPED",
    correlationId: event.correlationId,
    shipmentId: event.shipmentId,
    orderId: event.orderId,
    userId: event.userId,
  });

  console.log(`📦 Shipment : ${event.shipmentId}`);
  console.log(`🛒 Order    : ${event.orderId}`);
  console.log(`🔖 Tracking : ${event.trackingNumber}`);
  console.log(`🚚 Carrier  : ${event.carrier}`);

  console.log("");
  console.log("📧 Your order has been shipped.");

  logger.info({
    message: "Shipment notification sent",
    service: "notification-service",
    event: "SHIPMENT_NOTIFICATION_SENT",
    correlationId: event.correlationId,
    shipmentId: event.shipmentId,
    orderId: event.orderId,
    userId: event.userId,
    trackingNumber: event.trackingNumber,
    carrier: event.carrier,
    notificationType: "EMAIL",
  });

  console.log("================================");
  console.log("");
}
