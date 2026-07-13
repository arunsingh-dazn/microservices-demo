export function toShipmentResponse(shipment) {
  return {
    id: shipment._id,
    orderId: shipment.orderId,
    userId: shipment.userId,
    trackingNumber: shipment.trackingNumber,
    carrier: shipment.carrier,
    status: shipment.status,
    estimatedDelivery: shipment.estimatedDelivery,
    createdAt: shipment.createdAt,
    updatedAt: shipment.updatedAt,
  };
}
