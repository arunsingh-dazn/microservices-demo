import { logger } from "@microservices-demo/shared";

export async function handleOrderCreated(payload) {
  console.log("");
  console.log("================================");
  console.log("🛒 Order Received Service");
  console.log("================================");

  logger.info({
    message: "Received ORDER_CREATED",
    service: "notification-service",
    event: "ORDER_CREATED",
    correlationId: payload.correlationId,
    orderId: payload.orderId,
    userId: payload.userId,
    totalAmount: payload.totalAmount,
    status: payload.status,
  });

  console.log(`📦 Order ID : ${payload.orderId}`);
  console.log(`👤 User ID  : ${payload.userId}`);
  console.log(`💰 Amount   : ₹${payload.totalAmount}`);
  console.log(`📋 Status   : ${payload.status}`);

  console.log("");
  console.log("📧 We've received your order.");
  console.log("📦 We're verifying inventory and processing payment.");

  payload.items.forEach((item, index) => {
    console.log(
      `${index + 1}. Product: ${item.productId} | Qty: ${item.quantity} | Price: ₹${item.price}`,
    );
  });

  console.log("");

  logger.info({
    message: "Order confirmation notification sent",
    service: "notification-service",
    event: "ORDER_CONFIRMATION_SENT",
    correlationId: payload.correlationId,
    orderId: payload.orderId,
    userId: payload.userId,
    notificationType: "EMAIL",
  });

  console.log("📧 Order Confirmation Email Sent");

  console.log("================================");
  console.log("");
}
