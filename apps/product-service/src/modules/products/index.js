import { createProductRepository } from "./product.repository.js";
import { createProductService } from "./product.service.js";
import { createProductController } from "./product.controller.js";
import { createProductRoutes } from "./product.routes.js";

const repository = createProductRepository();

const service = createProductService(repository);

const controller = createProductController(service);

export const productRouter = createProductRoutes(controller);
