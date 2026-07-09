import { ConflictError, NotFoundError } from "@microservices-demo/shared";

import { PRODUCT_MESSAGES } from "./product.constants.js";
import { toProductResponse } from "./product.mapper.js";

export function createProductService(repository) {
  return {
    async createProduct(payload) {
      const existingProduct = await repository.findBySku(payload.sku);

      if (existingProduct) {
        throw new ConflictError(PRODUCT_MESSAGES.SKU_ALREADY_EXISTS);
      }

      const product = await repository.create(payload);

      return toProductResponse(product);
    },

    async getProducts() {
      const products = await repository.findAll();

      return products.map(toProductResponse);
    },

    async getProductById(id) {
      const product = await repository.findById(id);

      if (!product) {
        throw new NotFoundError(PRODUCT_MESSAGES.PRODUCT_NOT_FOUND);
      }

      return toProductResponse(product);
    },

    async updateProduct(id, payload) {
      const product = await repository.updateById(id, payload);

      if (!product) {
        throw new NotFoundError(PRODUCT_MESSAGES.PRODUCT_NOT_FOUND);
      }

      return toProductResponse(product);
    },

    async deleteProduct(id) {
      const product = await repository.findById(id);

      if (!product) {
        throw new NotFoundError(PRODUCT_MESSAGES.PRODUCT_NOT_FOUND);
      }

      await repository.deleteById(id);
    },
  };
}
