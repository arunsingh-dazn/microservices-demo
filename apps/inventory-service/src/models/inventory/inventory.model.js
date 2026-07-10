import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      index: true,
    },

    sku: {
      type: String,
      required: true,
      trim: true,
    },

    availableStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    reservedStock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
