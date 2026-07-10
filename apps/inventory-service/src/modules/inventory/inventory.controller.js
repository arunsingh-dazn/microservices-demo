import { ApiResponse, HTTP_STATUS } from "@microservices-demo/shared";

import { INVENTORY_MESSAGES } from "./inventory.constants.js";
import { toInventoryResponse } from "./inventory.mapper.js";

export function createInventoryController(service) {
  return {
    createInventory: async (req, res, next) => {
      try {
        const inventory = await service.createInventory(req.body);

        return res.status(HTTP_STATUS.CREATED).json(
          new ApiResponse({
            statusCode: HTTP_STATUS.CREATED,
            message: INVENTORY_MESSAGES.INVENTORY_CREATED,
            data: toInventoryResponse(inventory),
          }),
        );
      } catch (error) {
        next(error);
      }
    },

    getInventories: async (req, res, next) => {
      try {
        const inventories = await service.getInventories();

        return res.json(
          new ApiResponse({
            statusCode: HTTP_STATUS.OK,
            message: INVENTORY_MESSAGES.INVENTORY_FETCHED,
            data: inventories.map(toInventoryResponse),
          }),
        );
      } catch (error) {
        next(error);
      }
    },

    getInventoryByProductId: async (req, res, next) => {
      try {
        const inventory = await service.getInventoryByProductId(req.params.productId);

        return res.json(
          new ApiResponse({
            statusCode: HTTP_STATUS.OK,
            message: INVENTORY_MESSAGES.INVENTORY_FETCHED,
            data: toInventoryResponse(inventory),
          }),
        );
      } catch (error) {
        next(error);
      }
    },

    reserveStock: async (req, res, next) => {
      try {
        const inventory = await service.reserveStock(req.params.productId, req.body.quantity);

        return res.json(
          new ApiResponse({
            statusCode: HTTP_STATUS.OK,
            message: INVENTORY_MESSAGES.STOCK_RESERVED,
            data: toInventoryResponse(inventory),
          }),
        );
      } catch (error) {
        next(error);
      }
    },

    releaseStock: async (req, res, next) => {
      try {
        const inventory = await service.releaseStock(req.params.productId, req.body.quantity);

        return res.json(
          new ApiResponse({
            statusCode: HTTP_STATUS.OK,
            message: INVENTORY_MESSAGES.STOCK_RELEASED,
            data: toInventoryResponse(inventory),
          }),
        );
      } catch (error) {
        next(error);
      }
    },
  };
}
