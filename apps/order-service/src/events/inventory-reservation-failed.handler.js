import { logger } from "@microservices-demo/shared";

import service from "../modules/orders/index.js";

export async function handleInventoryReservationFailed(event) {
  console.log("");
  console.log("================================");
  console.log("📦 Order Service");
  console.log("================================");

  logger.info({
    message: "Received INVENTORY_RESERVATION_FAILED",
    service: "order-service",
    event: "INVENTORY_RESERVATION_FAILED",
    correlationId: event.correlationId,
    orderId: event.orderId,
    productId: event.productId,
    requestedQuantity: event.requestedQuantity,
    reason: event.reason,
  });

  const order = await service.cancelOrder(event.orderId, event.reason);

  logger.info({
    message: "Order cancelled due to inventory reservation failure",
    service: "order-service",
    event: "ORDER_CANCELLED",
    correlationId: event.correlationId,
    orderId: order._id.toString(),
    userId: order.userId.toString(),
    orderStatus: order.status,
    paymentStatus: order.paymentStatus,
    cancelReason: order.cancelReason,
  });

  console.log("================================");
  console.log("");
}
