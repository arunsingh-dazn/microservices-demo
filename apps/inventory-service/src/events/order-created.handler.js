import { createInventoryRepository } from "../modules/inventory/inventory.repository.js";
import { createInventoryService } from "../modules/inventory/inventory.service.js";
import { logger, publishEvent, TOPICS } from "@microservices-demo/shared";

const repository = createInventoryRepository();

const service = createInventoryService(repository);

export async function handleOrderCreated(order) {
  console.log("");
  console.log("================================");
  console.log("📦 Inventory Service");
  console.log("================================");

  logger.info({
    message: "Received ORDER_CREATED",
    service: "inventory-service",
    event: "ORDER_CREATED",
    correlationId: order.correlationId,
    orderId: order.orderId,
  });

  for (const item of order.items) {
    logger.info({
      message: "Reserving stock",
      service: "inventory-service",
      event: "STOCK_RESERVATION_STARTED",
      correlationId: order.correlationId,
      orderId: order.orderId,
      productId: item.productId,
      quantity: item.quantity,
    });

    try {
      const inventory = await service.reserveStock(item.productId, item.quantity);

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

      logger.info({
        message: "INVENTORY_RESERVED Published",
        service: "inventory-service",
        event: "INVENTORY_RESERVED",
        correlationId: order.correlationId,
        orderId: order.orderId,
        productId: item.productId,
      });
    } catch (error) {
      console.log("");
      console.log("================================");
      console.log("❌ Inventory Reservation Failed");
      console.log("================================");

      await publishEvent(
        TOPICS.INVENTORY_RESERVATION_FAILED,
        {
          orderId: order.orderId,
          userId: order.userId,
          productId: item.productId,
          requestedQuantity: item.quantity,
          reason: error.message,
        },
        order.correlationId,
      );

      logger.error({
        message: "Inventory reservation failed",
        service: "inventory-service",
        event: "INVENTORY_RESERVATION_FAILED",
        correlationId: order.correlationId,
        orderId: order.orderId,
        productId: item.productId,
        reason: error.message,
      });

      logger.info({
        message: "INVENTORY_RESERVATION_FAILED Published",
        service: "inventory-service",
        event: "INVENTORY_RESERVATION_FAILED",
        correlationId: order.correlationId,
        orderId: order.orderId,
        productId: item.productId,
      });

      // Don't rethrow the error.
      // We want Kafka to consider the message processed and
      // let the Order Service compensate.
    }
  }

  logger.info({
    message: "Stock reserved successfully",
    service: "inventory-service",
    event: "STOCK_RESERVED",
    correlationId: order.correlationId,
    orderId: order.orderId,
  });
}
