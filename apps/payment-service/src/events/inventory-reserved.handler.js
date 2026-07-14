import { publishEvent, TOPICS } from "@microservices-demo/shared";
import service from "../modules/payments/index.js";
import { PAYMENT_STATUS } from "../modules/payments/payment.constants.js";

export async function handleInventoryReserved(event) {
  console.log("");
  console.log("================================");
  console.log("💳 Payment Service");
  console.log("================================");
  console.log("Correlation ID:", event.correlationId);

  console.log(`Processing Payment for Order ${event.orderId}`);

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

    console.log("📤 PAYMENT_COMPLETED Published");
    console.log("✅ Payment Successful");
    console.log("================================");
    console.log("");
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

    console.log("📤 PAYMENT_FAILED Published");
    console.log("❌ Payment Failed");
    console.log("================================");
    console.log("");
  }
}
