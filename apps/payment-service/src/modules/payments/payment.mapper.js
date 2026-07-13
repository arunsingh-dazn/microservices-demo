export function toPaymentResponse(payment) {
  return {
    id: payment._id,
    orderId: payment.orderId,
    amount: payment.amount,
    status: payment.status,
    createdAt: payment.createdAt,
  };
}
