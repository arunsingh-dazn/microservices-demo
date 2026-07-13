import service from "../modules/orders/index.js";

export async function handleInventoryReservationFailed(event) {
  console.log("");
  console.log("================================");
  console.log("📦 Order Service");
  console.log("================================");

  console.log("Inventory Reservation Failed");
  console.log("Order:", event.orderId);

  const order = await service.cancelOrder(event.orderId, event.reason);

  console.log("✅ Order Cancelled");
  console.log("Reason:", order.cancelReason);

  console.log("================================");
  console.log("");
}
