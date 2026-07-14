import { publishEvent, TOPICS } from "@microservices-demo/shared";

import { createInventoryRepository } from "../modules/inventory/inventory.repository.js";
import { createInventoryService } from "../modules/inventory/inventory.service.js";

const repository = createInventoryRepository();

const service = createInventoryService(repository);

export async function handlePaymentFailed(event) {
  console.log("");
  console.log("================================");
  console.log("📦 Inventory Service");
  console.log("================================");
  console.log("Correlation ID:", event.correlationId);

  console.log(`Payment Failed for Order ${event.orderId}`);

  // Release reserved stock
  const inventory = await service.releaseStock(event.productId, event.quantity);

  await publishEvent(
    TOPICS.INVENTORY_RELEASED,
    {
      orderId: event.orderId,
      userId: event.userId,
      productId: event.productId,
      quantity: event.quantity,
      availableStock: inventory.availableStock,
      reservedStock: inventory.reservedStock,
    },
    event.correlationId,
  );

  console.log("📤 INVENTORY_RELEASED Published");

  console.log("✅ Stock Released");

  console.log("================================");
  console.log("");
}
