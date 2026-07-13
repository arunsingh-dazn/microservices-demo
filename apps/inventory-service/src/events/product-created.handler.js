import { createInventoryRepository } from "../modules/inventory/inventory.repository.js";
import { createInventoryService } from "../modules/inventory/inventory.service.js";

const repository = createInventoryRepository();
const service = createInventoryService(repository);

export async function handleProductCreated(product) {
  console.log("");
  console.log("===============================");
  console.log("📦 PRODUCT_CREATED received");
  console.log("===============================");

  console.log("Received Product Event:", product);

  await service.createInventory({
    productId: product.productId,
    sku: product.sku,
    availableStock: product.stock,
  });

  console.log("✅ Inventory Created");
  console.log("===============================");
}
