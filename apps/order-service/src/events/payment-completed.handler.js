import service from "../modules/orders/index.js";

export async function handlePaymentCompleted(event) {
  console.log("");
  console.log("================================");
  console.log("📦 Order Service");
  console.log("================================");

  console.log(`Payment Completed for Order ${event.orderId}`);

  const order = await service.completePayment(event.orderId);

  console.log("✅ Order Updated");
  console.log("Order Status:", order.status);
  console.log("Payment Status:", order.paymentStatus);

  console.log("================================");
  console.log("");
}
