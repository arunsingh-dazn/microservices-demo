import service from "../modules/shipping/index.js";
import { publishEvent, TOPICS } from "@microservices-demo/shared";

export async function handleOrderConfirmed(order) {
  console.log("");
  console.log("================================");
  console.log("🚚 Shipping Service");
  console.log("================================");

  console.log(`Creating Shipment for Order ${order.orderId}`);

  const shipment = await service.createShipment({
    orderId: order.orderId,
    userId: order.userId,
  });

  await publishEvent(TOPICS.SHIPMENT_CREATED, {
    shipmentId: shipment._id.toString(),
    orderId: shipment.orderId.toString(),
    userId: shipment.userId.toString(),
    trackingNumber: shipment.trackingNumber,
    carrier: shipment.carrier,
    status: shipment.status,
    estimatedDelivery: shipment.estimatedDelivery,
  });

  console.log("📤 SHIPMENT_CREATED Published");
  console.log("✅ Shipment Created");
  console.log("================================");
  console.log("");
}
