import { logger } from "@microservices-demo/shared";

export async function handleShipmentOutForDelivery(event) {
  console.log("");
  console.log("================================");
  console.log("🚚 Out For Delivery");
  console.log("================================");

  logger.info({
    message: "Received SHIPMENT_OUT_FOR_DELIVERY",
    service: "notification-service",
    event: "SHIPMENT_OUT_FOR_DELIVERY",
    correlationId: event.correlationId,
    shipmentId: event.shipmentId,
    orderId: event.orderId,
    userId: event.userId,
  });

  console.log(`📦 Shipment : ${event.shipmentId}`);
  console.log(`🛒 Order    : ${event.orderId}`);

  console.log("");
  console.log("📧 Your order is out for delivery.");

  logger.info({
    message: "Out for delivery notification sent",
    service: "notification-service",
    event: "OUT_FOR_DELIVERY_NOTIFICATION_SENT",
    correlationId: event.correlationId,
    shipmentId: event.shipmentId,
    orderId: event.orderId,
    userId: event.userId,
    notificationType: "EMAIL",
  });

  console.log("================================");
  console.log("");
}
