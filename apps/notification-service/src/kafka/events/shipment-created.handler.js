import { logger } from "@microservices-demo/shared";

export async function handleShipmentCreated(event) {
  console.log("");
  console.log("================================");
  console.log("📦 Shipment Notification Service");
  console.log("================================");

  logger.info({
    message: "Received SHIPMENT_CREATED",
    service: "notification-service",
    event: "SHIPMENT_CREATED",
    correlationId: event.correlationId,
    shipmentId: event.shipmentId,
    orderId: event.orderId,
    userId: event.userId,
  });

  console.log(`📦 Shipment ID : ${event.shipmentId}`);
  console.log(`🛒 Order ID    : ${event.orderId}`);
  console.log(`👤 User ID     : ${event.userId}`);

  console.log("");

  console.log(`🚚 Carrier     : ${event.carrier}`);
  console.log(`🔖 Tracking No : ${event.trackingNumber}`);
  console.log(`📋 Status      : ${event.status}`);

  console.log("");

  console.log(`📅 Estimated Delivery : ${new Date(event.estimatedDelivery).toDateString()}`);

  console.log("");

  console.log("📧 Your order has been shipped");

  logger.info({
    message: "Shipment notification sent",
    service: "notification-service",
    event: "SHIPMENT_NOTIFICATION_SENT",
    correlationId: event.correlationId,
    shipmentId: event.shipmentId,
    orderId: event.orderId,
    userId: event.userId,
    carrier: event.carrier,
    trackingNumber: event.trackingNumber,
    notificationType: "EMAIL",
  });

  console.log("================================");
  console.log("");
}
