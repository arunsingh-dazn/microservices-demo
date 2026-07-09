export function toProductResponse(product) {
  return {
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    sku: product.sku,
    price: product.price,
    stock: product.stock,
    category: product.category,
    image: product.image,
    status: product.status,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}
