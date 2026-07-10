import { InternalServerError, NotFoundError } from "@microservices-demo/shared";

export async function getProductById(productId) {
  const url = `${process.env.PRODUCT_SERVICE_URL}/products/${productId}`;

  console.log("Calling:", url);

  const response = await fetch(url);

  console.log("Status:", response.status);

  if (response.status === 404) {
    throw new NotFoundError("Product not found.");
  }

  if (!response.ok) {
    throw new InternalServerError("Failed to communicate with Product Service.");
  }

  const result = await response.json();

  return result.data;
}
