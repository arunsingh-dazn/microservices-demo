export async function handleShipmentDelivered(event) {
  console.log("");
  console.log("================================");
  console.log("✅ Shipment Delivered");
  console.log("================================");

  console.log(`📦 Shipment : ${event.shipmentId}`);
  console.log(`🛒 Order    : ${event.orderId}`);

  console.log("");
  console.log("📧 Your order has been delivered.");
  console.log("================================");
  console.log("");
}
