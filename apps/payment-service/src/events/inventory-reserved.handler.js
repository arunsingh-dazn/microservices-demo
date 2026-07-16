import { logger, publishEvent, TOPICS } from "@microservices-demo/shared";

import service from "../modules/payments/index.js";
import { PAYMENT_STATUS } from "../modules/payments/payment.constants.js";

export async function handleInventoryReserved(event) {
  console.log("");
  console.log("================================");
  console.log("💳 Payment Service");
  console.log("================================");

  logger.info({
    message: "Received INVENTORY_RESERVED",
    service: "payment-service",
    event: "INVENTORY_RESERVED",
    correlationId: event.correlationId,
    orderId: event.orderId,
    userId: event.userId,
    amount: event.totalAmount,
    productId: event.productId,
    quantity: event.quantity,
  });

  const isPaymentSuccessful = process.env.FORCE_PAYMENT_FAILURE !== "true";

  const payment = await service.createPayment({
    orderId: event.orderId,
    userId: event.userId,
    amount: event.totalAmount,
    status: isPaymentSuccessful ? PAYMENT_STATUS.SUCCESS : PAYMENT_STATUS.FAILED,
    correlationId: event.correlationId,
  });

  if (isPaymentSuccessful) {
    await publishEvent(
      TOPICS.PAYMENT_COMPLETED,
      {
        paymentId: payment._id.toString(),
        orderId: payment.orderId.toString(),
        userId: payment.userId.toString(),
        amount: payment.amount,
        status: payment.status,
      },
      event.correlationId,
    );

    logger.info({
      message: "PAYMENT_COMPLETED Published",
      service: "payment-service",
      event: "PAYMENT_COMPLETED",
      correlationId: event.correlationId,
      paymentId: payment._id.toString(),
      orderId: payment.orderId.toString(),
      userId: payment.userId.toString(),
    });

    logger.info({
      message: "Payment processed successfully",
      service: "payment-service",
      event: "PAYMENT_SUCCESS",
      correlationId: event.correlationId,
      paymentId: payment._id.toString(),
      orderId: payment.orderId.toString(),
      amount: payment.amount,
      paymentStatus: payment.status,
    });
  } else {
    await publishEvent(
      TOPICS.PAYMENT_FAILED,
      {
        orderId: event.orderId,
        userId: event.userId,
        amount: payment.amount,
        paymentId: payment._id.toString(),
        productId: event.productId,
        quantity: event.quantity,
        reason: "Payment authorization failed",
      },
      event.correlationId,
    );

    logger.info({
      message: "PAYMENT_FAILED Published",
      service: "payment-service",
      event: "PAYMENT_FAILED",
      correlationId: event.correlationId,
      paymentId: payment._id.toString(),
      orderId: payment.orderId.toString(),
      userId: payment.userId.toString(),
    });

    logger.error({
      message: "Payment processing failed",
      service: "payment-service",
      event: "PAYMENT_FAILURE",
      correlationId: event.correlationId,
      paymentId: payment._id.toString(),
      orderId: payment.orderId.toString(),
      amount: payment.amount,
      reason: "Payment authorization failed",
    });
  }

  console.log("================================");
  console.log("");
}
