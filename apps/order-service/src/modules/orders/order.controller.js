import { ApiResponse, HTTP_STATUS } from "@microservices-demo/shared";
import { ORDER_MESSAGES } from "./order.constants.js";

export function createOrderController(service) {
  return {
    createOrder: async (req, res, next) => {
      try {
        const order = await service.createOrder(req.user.userId, req.body);

        return res.status(HTTP_STATUS.CREATED).json(
          new ApiResponse({
            statusCode: HTTP_STATUS.CREATED,
            message: ORDER_MESSAGES.CREATED_SUCCESS,
            data: order,
          }),
        );
      } catch (error) {
        next(error);
      }
    },

    getOrders: async (req, res, next) => {
      try {
        const orders = await service.getOrders();

        return res.json(
          new ApiResponse({
            statusCode: HTTP_STATUS.OK,
            message: "Orders fetched successfully.",
            data: orders,
          }),
        );
      } catch (error) {
        next(error);
      }
    },

    getOrderById: async (req, res, next) => {
      try {
        const order = await service.getOrderById(req.params.id);

        return res.json(
          new ApiResponse({
            statusCode: HTTP_STATUS.OK,
            message: ORDER_MESSAGES.FETCHED_SUCCESS,
            data: order,
          }),
        );
      } catch (error) {
        next(error);
      }
    },

    cancelOrder: async (req, res, next) => {
      try {
        const order = await service.cancelOrder(req.params.id);

        return res.json(
          new ApiResponse({
            statusCode: HTTP_STATUS.OK,
            message: ORDER_MESSAGES.CANCELLED_SUCCESS,
            data: order,
          }),
        );
      } catch (error) {
        next(error);
      }
    },
  };
}
