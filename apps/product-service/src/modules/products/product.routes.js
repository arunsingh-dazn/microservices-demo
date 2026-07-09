import { Router } from "express";

import { validate } from "../../middleware/validate.middleware.js";

import { createProductSchema, updateProductSchema } from "./product.schema.js";
import { authenticate } from "../../middleware/authenticate.middleware.js";
import { authorize } from "../../../../user-service/src/middleware/authorize.middleware.js";

export function createProductRoutes(controller) {
  const router = Router();

  router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate(createProductSchema),
    controller.createProduct,
  );

  router.get("/", controller.getProducts);

  router.get("/:id", controller.getProductById);

  router.patch(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    validate(updateProductSchema),
    controller.updateProduct,
  );

  router.delete("/:id", authenticate, authorize("ADMIN"), controller.deleteProduct);

  return router;
}
