import { logger, publishEvent, TOPICS } from "@microservices-demo/shared";

import { createInventoryRepository } from "../modules/inventory/inventory.repository.js";
import { createInventoryService } from "../modules/inventory/inventory.service.js";

const repository = createInventoryRepository();

const service = createInventoryService(repository);

export async function handlePaymentFailed(event) {
  console.log("");
  console.log("================================");
  console.log("📦 Inventory Service");
  console.log("================================");

  logger.info({
    message: "Received PAYMENT_FAILED",
    service: "inventory-service",
    event: "PAYMENT_FAILED",
    correlationId: event.correlationId,
    orderId: event.orderId,
    paymentId: event.paymentId,
  });

  const inventory = await service.releaseStock(event.productId, event.quantity);

  logger.info({
    message: "Stock released",
    service: "inventory-service",
    event: "STOCK_RELEASED",
    correlationId: event.correlationId,
    orderId: event.orderId,
    productId: event.productId,
    quantity: event.quantity,
    availableStock: inventory.availableStock,
    reservedStock: inventory.reservedStock,
  });

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

  logger.info({
    message: "INVENTORY_RELEASED Published",
    service: "inventory-service",
    event: "INVENTORY_RELEASED",
    correlationId: event.correlationId,
    orderId: event.orderId,
    productId: event.productId,
  });
}
