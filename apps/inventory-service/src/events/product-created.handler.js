import { logger } from "@microservices-demo/shared";

import { createInventoryRepository } from "../modules/inventory/inventory.repository.js";
import { createInventoryService } from "../modules/inventory/inventory.service.js";

const repository = createInventoryRepository();
const service = createInventoryService(repository);

export async function handleProductCreated(product) {
  console.log("");
  console.log("===============================");
  console.log("📦 PRODUCT_CREATED received");
  console.log("===============================");

  logger.info({
    message: "Received PRODUCT_CREATED",
    service: "inventory-service",
    event: "PRODUCT_CREATED",
    correlationId: product.correlationId,
    productId: product.productId,
    sku: product.sku,
    initialStock: product.stock,
  });

  await service.createInventory({
    productId: product.productId,
    sku: product.sku,
    availableStock: product.stock,
  });

  logger.info({
    message: "Inventory created successfully",
    service: "inventory-service",
    event: "INVENTORY_CREATED",
    correlationId: product.correlationId,
    productId: product.productId,
    sku: product.sku,
    availableStock: product.stock,
  });
}
