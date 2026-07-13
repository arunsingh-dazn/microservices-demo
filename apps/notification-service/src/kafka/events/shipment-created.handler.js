export async function handleShipmentCreated(event) {
  console.log("");
  console.log("================================");
  console.log("📦 Shipment Notification Service");
  console.log("================================");

  console.log(`📦 Shipment ID : ${event.shipmentId}`);
  console.log(`🛒 Order ID    : ${event.orderId}`);
  console.log(`👤 User ID     : ${event.userId}`);

  console.log("");

  console.log(`🚚 Carrier     : ${event.carrier}`);
  console.log(`🔖 Tracking No : ${event.trackingNumber}`);
  console.log(`📋 Status      : ${event.status}`);

  console.log("");

  console.log(`📅 Estimated Delivery : ${new Date(event.estimatedDelivery).toDateString()}`);

  console.log("");

  console.log("📧 Your order has been shipped");

  console.log("================================");
  console.log("");
}
