import { createInventoryRepository } from "../modules/inventory/inventory.repository.js";
import { createInventoryService } from "../modules/inventory/inventory.service.js";
import { publishEvent, TOPICS } from "@microservices-demo/shared";

const repository = createInventoryRepository();

const service = createInventoryService(repository);

export async function handleOrderCreated(order) {
  console.log("");
  console.log("================================");
  console.log("📦 Inventory Service");
  console.log("Correlation ID:", order.correlationId);
  console.log("================================");

  console.log("Received ORDER_CREATED");

  for (const item of order.items) {
    console.log(`Reserving ${item.quantity} units for Product ${item.productId}`);

    try {
      const inventory = await service.reserveStock(item.productId, item.quantity);

      console.log("Publishing INVENTORY_RESERVED:", {
        orderId: order.orderId,
        userId: order.userId,
        totalAmount: order.totalAmount,
        productId: item.productId,
      });

      await publishEvent(
        TOPICS.INVENTORY_RESERVED,
        {
          orderId: order.orderId,
          userId: order.userId,
          totalAmount: order.totalAmount,

          productId: item.productId,
          quantity: item.quantity,

          availableStock: inventory.availableStock,
          reservedStock: inventory.reservedStock,
        },
        order.correlationId,
      );

      console.log("📤 INVENTORY_RESERVED Published");
    } catch (error) {
      console.log("");
      console.log("================================");
      console.log("❌ Inventory Reservation Failed");
      console.log("================================");
      console.log(error.message);

      await publishEvent(TOPICS.INVENTORY_RESERVATION_FAILED, {
        orderId: order.orderId,
        userId: order.userId,
        productId: item.productId,
        requestedQuantity: item.quantity,
        reason: error.message,
      });

      console.log("📤 INVENTORY_RESERVATION_FAILED Published");
      console.log("================================");
      console.log("");

      // Don't rethrow the error.
      // We want Kafka to consider the message processed and
      // let the Order Service compensate.
    }
  }

  console.log("✅ Stock Reserved");
  console.log("================================");
  console.log("");
}
