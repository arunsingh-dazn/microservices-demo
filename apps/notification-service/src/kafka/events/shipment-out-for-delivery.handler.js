export async function handleShipmentOutForDelivery(event) {
  console.log("");
  console.log("================================");
  console.log("🚚 Out For Delivery");
  console.log("================================");

  console.log(`📦 Shipment : ${event.shipmentId}`);
  console.log(`🛒 Order    : ${event.orderId}`);

  console.log("");
  console.log("📧 Your order is out for delivery.");
  console.log("================================");
  console.log("");
}
