import { logger } from "@microservices-demo/shared";

import service from "../modules/orders/index.js";

export async function handleInventoryReleased(event) {
  console.log("");
  console.log("================================");
  console.log("📦 Order Service");
  console.log("================================");

  logger.info({
    message: "Received INVENTORY_RELEASED",
    service: "order-service",
    event: "INVENTORY_RELEASED",
    correlationId: event.correlationId,
    orderId: event.orderId,
    productId: event.productId,
    quantity: event.quantity,
  });

  const order = await service.updateAfterPaymentFailure(event.orderId);

  logger.info({
    message: "Order cancelled after payment failure",
    service: "order-service",
    event: "ORDER_CANCELLED",
    correlationId: event.correlationId,
    orderId: order._id.toString(),
    userId: order.userId.toString(),
    orderStatus: order.status,
    paymentStatus: order.paymentStatus,
  });

  console.log("================================");
  console.log("");
}
