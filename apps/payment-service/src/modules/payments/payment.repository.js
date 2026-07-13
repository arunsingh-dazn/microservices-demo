import { Payment } from "../../models/payment/payment.model.js";

export function createPaymentRepository() {
  return {
    create: (payload) => Payment.create(payload),

    findByOrderId: (orderId) => Payment.findOne({ orderId }),
  };
}
