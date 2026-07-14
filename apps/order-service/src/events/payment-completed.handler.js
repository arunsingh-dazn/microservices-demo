import { publishEvent, TOPICS } from "@microservices-demo/shared";
import service from "../modules/orders/index.js";

export async function handlePaymentCompleted(event) {
  console.log("");
  console.log("================================");
  console.log("📦 Order Service");
  console.log("================================");
  console.log("Correlation ID:", event.correlationId);

  console.log(`Payment Completed for Order ${event.orderId}`);

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

  console.log("📤 ORDER_CONFIRMED Published");

  console.log("✅ Order Updated");
  console.log("Order Status:", order.status);
  console.log("Payment Status:", order.paymentStatus);

  console.log("================================");
  console.log("");
}
