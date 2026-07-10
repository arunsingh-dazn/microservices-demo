import { createInventoryRepository } from "../modules/inventory/inventory.repository.js";
import { createInventoryService } from "../modules/inventory/inventory.service.js";
import { publishEvent, TOPICS } from "@microservices-demo/shared";

const repository = createInventoryRepository();

const service = createInventoryService(repository);

export async function handleOrderCreated(order) {
  console.log("");
  console.log("================================");
  console.log("📦 Inventory Service");
  console.log("================================");

  console.log("Received ORDER_CREATED");

  for (const item of order.items) {
    console.log(`Reserving ${item.quantity} units for Product ${item.productId}`);

    const inventory = await service.reserveStock(item.productId, item.quantity);

    await publishEvent(TOPICS.INVENTORY_RESERVED, {
      orderId: order.orderId,
      productId: item.productId,
      quantity: item.quantity,
      availableStock: inventory.availableStock,
      reservedStock: inventory.reservedStock,
    });

    console.log("📤 INVENTORY_RESERVED Published");
  }

  console.log("✅ Stock Reserved");
  console.log("================================");
  console.log("");
}
