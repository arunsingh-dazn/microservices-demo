import Order from "../../models/orders/order.model.js";

export function createOrderRepository() {
  return {
    async create(payload) {
      return Order.create(payload);
    },

    async findAll() {
      return Order.find().sort({ createdAt: -1 });
    },

    async findById(id) {
      return Order.findById(id);
    },

    async findByUserId(userId) {
      return Order.find({ userId }).sort({ createdAt: -1 });
    },

    async updateById(id, payload) {
      return Order.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });
    },

    async deleteById(id) {
      return Order.findByIdAndDelete(id);
    },

    async updatePaymentStatus(orderId, payload) {
      return Order.findByIdAndUpdate(orderId, payload, {
        returnDocument: "after",
      });
    },
  };
}
