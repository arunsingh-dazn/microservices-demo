import { BadRequestError, NotFoundError } from "@microservices-demo/shared";

import { INVENTORY_MESSAGES } from "./inventory.constants.js";

export function createInventoryService(repository) {
  return {
    async createInventory(payload) {
      const existingInventory = await repository.findByProductId(payload.productId);

      if (existingInventory) {
        throw new BadRequestError("Inventory already exists for this product.");
      }

      const inventory = await repository.create({
        ...payload,
        reservedStock: 0,
      });

      return inventory;
    },

    async getInventories() {
      return repository.findAll();
    },

    async getInventoryByProductId(productId) {
      const inventory = await repository.findByProductId(productId);

      if (!inventory) {
        throw new NotFoundError(INVENTORY_MESSAGES.INVENTORY_NOT_FOUND);
      }

      return inventory;
    },

    async reserveStock(productId, quantity) {
      const inventory = await repository.findByProductId(productId);

      if (!inventory) {
        throw new NotFoundError(INVENTORY_MESSAGES.INVENTORY_NOT_FOUND);
      }

      if (inventory.availableStock < quantity) {
        throw new BadRequestError(INVENTORY_MESSAGES.INSUFFICIENT_STOCK);
      }

      inventory.availableStock -= quantity;
      inventory.reservedStock += quantity;

      await inventory.save();

      return inventory;
    },

    async releaseStock(productId, quantity) {
      const inventory = await repository.findByProductId(productId);

      if (!inventory) {
        throw new NotFoundError(INVENTORY_MESSAGES.INVENTORY_NOT_FOUND);
      }

      inventory.availableStock += quantity;
      inventory.reservedStock -= quantity;

      await inventory.save();

      return inventory;
    },
  };
}
