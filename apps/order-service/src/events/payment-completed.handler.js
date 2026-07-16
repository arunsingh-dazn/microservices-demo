import { logger, publishEvent, TOPICS } from "@microservices-demo/shared";

import service from "../modules/orders/index.js";

export async function handlePaymentCompleted(event) {
  console.log("");
  console.log("================================");
  console.log("📦 Order Service");
  console.log("================================");

  logger.info({
    message: "Received PAYMENT_COMPLETED",
    service: "order-service",
    event: "PAYMENT_COMPLETED",
    correlationId: event.correlationId,
    orderId: event.orderId,
    paymentId: event.paymentId,
    amount: event.amount,
  });

  const order = await service.completePayment(event.orderId);

  await publishEvent(
    TOPICS.ORDER_CONFIRMED,
    {
      orderId: order._id.toString(),
      userId: order.userId.toString(),
      totalAmount: order.totalAmount,
      status: order.status,
      paymentStatus: order.paymentStatus,
      items: order.items,
    },
    event.correlationId,
  );

  logger.info({
    message: "ORDER_CONFIRMED Published",
    service: "order-service",
    event: "ORDER_CONFIRMED",
    correlationId: event.correlationId,
    orderId: order._id.toString(),
    userId: order.userId.toString(),
  });

  logger.info({
    message: "Order confirmed successfully",
    service: "order-service",
    event: "ORDER_UPDATED",
    correlationId: event.correlationId,
    orderId: order._id.toString(),
    userId: order.userId.toString(),
    orderStatus: order.status,
    paymentStatus: order.paymentStatus,
  });

  console.log("================================");
  console.log("");
}
