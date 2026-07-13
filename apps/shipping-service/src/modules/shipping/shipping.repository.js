import { Shipment } from "../../models/shipment/shipment.model.js";

export function createShippingRepository() {
  return {
    create(payload) {
      return Shipment.create(payload);
    },

    findAll() {
      return Shipment.find();
    },

    findById(id) {
      return Shipment.findById(id);
    },

    findByOrderId(orderId) {
      return Shipment.findOne({ orderId });
    },
  };
}
