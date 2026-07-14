import service from "../modules/orders/index.js";

export async function handleInventoryReleased(event) {
  console.log("");
  console.log("================================");
  console.log("📦 Order Service");
  console.log("================================");

  console.log(`Inventory Released for Order ${event.orderId}`);

  const order = await service.updateAfterPaymentFailure(event.orderId);

  console.log("✅ Order Cancelled");
  console.log(`Order Status: ${order.status}`);
  console.log(`Payment Status: ${order.paymentStatus}`);

  console.log("================================");
  console.log("");
}
