import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    trackingNumber: {
      type: String,
      required: true,
      unique: true,
    },

    carrier: {
      type: String,
      default: "BlueDart",
    },

    status: {
      type: String,
      enum: ["PENDING", "PACKED", "SHIPPED", "IN_TRANSIT", "DELIVERED"],
      default: "PENDING",
    },

    estimatedDelivery: Date,
  },
  {
    timestamps: true,
  },
);

export const Shipment = mongoose.model("Shipment", shipmentSchema);
