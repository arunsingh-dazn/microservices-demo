import "dotenv/config";

import mongoose from "mongoose";

import Product from "../src/models/products/product.model.js";
import products from "../data/products.js";

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Mongo Connected");

    await Product.deleteMany({});

    console.log("🗑 Existing products removed");

    await Product.insertMany(products);

    console.log(`✅ ${products.length} Products Inserted`);

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

seedProducts();
