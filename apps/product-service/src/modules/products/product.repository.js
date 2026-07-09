import Product from "../../models/products/product.model.js";

export function createProductRepository() {
  return {
    async create(payload) {
      return Product.create(payload);
    },

    async findAll() {
      return Product.find().sort({ createdAt: -1 });
    },

    async findById(id) {
      return Product.findById(id);
    },

    async findBySku(sku) {
      return Product.findOne({ sku });
    },

    async updateById(id, payload) {
      return Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });
    },

    async deleteById(id) {
      return Product.findByIdAndDelete(id);
    },
  };
}
