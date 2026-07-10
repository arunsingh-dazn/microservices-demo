export function toInventoryResponse(inventory) {
  return {
    id: inventory._id.toString(),
    productId: inventory.productId.toString(),
    sku: inventory.sku,
    availableStock: inventory.availableStock,
    reservedStock: inventory.reservedStock,
    createdAt: inventory.createdAt,
    updatedAt: inventory.updatedAt,
  };
}
