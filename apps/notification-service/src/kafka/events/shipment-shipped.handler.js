export async function handleShipmentShipped(event) {
  console.log("");
  console.log("================================");
  console.log("🚚 Shipment Shipped");
  console.log("================================");

  console.log(`📦 Shipment : ${event.shipmentId}`);
  console.log(`🛒 Order    : ${event.orderId}`);
  console.log(`🔖 Tracking : ${event.trackingNumber}`);
  console.log(`🚚 Carrier  : ${event.carrier}`);

  console.log("");
  console.log("📧 Your order has been shipped.");
  console.log("================================");
  console.log("");
}
