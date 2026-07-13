import { createShippingRepository } from "./shipping.repository.js";
import { createShippingService } from "./shipping.service.js";
import { createShippingController } from "./shipping.controller.js";
import { createShippingRoutes } from "./shipping.routes.js";

const repository = createShippingRepository();

const service = createShippingService(repository);

const controller = createShippingController(service);

export const shippingRouter = createShippingRoutes(controller);

export default service;
