import Inventory from "../../models/inventory/inventory.model.js";

export function createInventoryRepository() {
  return {
    async create(payload) {
      return Inventory.create(payload);
    },

    async findAll() {
      return Inventory.find().sort({ createdAt: -1 });
    },

    async findById(id) {
      return Inventory.findById(id);
    },

    async findByProductId(productId) {
      return Inventory.findOne({ productId });
    },

    async updateByProductId(productId, payload) {
      return Inventory.findOneAndUpdate({ productId }, payload, {
        new: true,
        runValidators: true,
      });
    },

    async deleteById(id) {
      return Inventory.findByIdAndDelete(id);
    },
  };
}
