export function toOrderResponse(order) {
  return {
    id: order._id.toString(),
    userId: order.userId,
    items: order.items,
    totalAmount: order.totalAmount,
    status: order.status,
    paymentStatus: order.paymentStatus,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
}
