import { NotFoundError } from "@microservices-demo/shared";

import { getProductById } from "../../clients/product.client.js";
import { ORDER_MESSAGES } from "./order.constants.js";
import { toOrderResponse } from "./order.mapper.js";
import { publishEvent, TOPICS } from "@microservices-demo/shared";

export function createOrderService(repository) {
  return {
    async createOrder(userId, payload) {
      const items = [];
      let totalAmount = 0;

      for (const item of payload.items) {
        const product = await getProductById(item.productId);

        items.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        });

        totalAmount += product.price * item.quantity;
      }

      const order = await repository.create({
        userId,
        items,
        totalAmount,
      });

      await publishEvent(TOPICS.ORDER_CREATED, {
        orderId: order._id.toString(),
        userId: order.userId.toString(),
        items: order.items,
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt,
      });

      console.log("📤 Event published: order.created");

      return toOrderResponse(order);
    },

    async getOrders() {
      const orders = await repository.findAll();

      return orders.map(toOrderResponse);
    },

    async getOrderById(id) {
      const order = await repository.findById(id);

      if (!order) {
        throw new NotFoundError(ORDER_MESSAGES.ORDER_NOT_FOUND);
      }

      return toOrderResponse(order);
    },

    async cancelOrder(id) {
      const order = await repository.findById(id);

      if (!order) {
        throw new NotFoundError(ORDER_MESSAGES.ORDER_NOT_FOUND);
      }

      order.status = "CANCELLED";

      await order.save();

      return toOrderResponse(order);
    },
  };
}
