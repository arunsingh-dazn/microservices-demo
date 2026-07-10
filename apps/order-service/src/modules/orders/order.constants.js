export const ORDER_STATUS = {
  CREATED: "CREATED",
  CONFIRMED: "CONFIRMED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
};

export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
};

export const ORDER_MESSAGES = {
  CREATED_SUCCESS: "Order created successfully.",
  FETCHED_SUCCESS: "Order fetched successfully.",
  UPDATED_SUCCESS: "Order updated successfully.",
  CANCELLED_SUCCESS: "Order cancelled successfully.",

  ORDER_NOT_FOUND: "Order not found.",
  INVALID_ORDER: "Invalid order.",
};
