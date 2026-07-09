import { ApiResponse, HTTP_STATUS } from "@microservices-demo/shared";

import { PRODUCT_MESSAGES } from "./product.constants.js";

export function createProductController(service) {
  return {
    createProduct: async (req, res, next) => {
      try {
        const product = await service.createProduct(req.body);

        return res.status(HTTP_STATUS.CREATED).json(
          new ApiResponse({
            statusCode: HTTP_STATUS.CREATED,
            message: PRODUCT_MESSAGES.CREATED_SUCCESS,
            data: product,
          }),
        );
      } catch (error) {
        next(error);
      }
    },

    getProducts: async (req, res, next) => {
      try {
        const products = await service.getProducts();

        return res.json(
          new ApiResponse({
            statusCode: HTTP_STATUS.OK,
            message: "Products fetched successfully.",
            data: products,
          }),
        );
      } catch (error) {
        next(error);
      }
    },

    getProductById: async (req, res, next) => {
      try {
        const product = await service.getProductById(req.params.id);

        return res.json(
          new ApiResponse({
            statusCode: HTTP_STATUS.OK,
            message: "Product fetched successfully.",
            data: product,
          }),
        );
      } catch (error) {
        next(error);
      }
    },

    updateProduct: async (req, res, next) => {
      try {
        const product = await service.updateProduct(req.params.id, req.body);

        return res.json(
          new ApiResponse({
            statusCode: HTTP_STATUS.OK,
            message: PRODUCT_MESSAGES.UPDATED_SUCCESS,
            data: product,
          }),
        );
      } catch (error) {
        next(error);
      }
    },

    deleteProduct: async (req, res, next) => {
      try {
        await service.deleteProduct(req.params.id);

        return res.json(
          new ApiResponse({
            statusCode: HTTP_STATUS.OK,
            message: PRODUCT_MESSAGES.DELETED_SUCCESS,
          }),
        );
      } catch (error) {
        next(error);
      }
    },
  };
}
