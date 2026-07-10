import { createOrderRepository } from "./order.repository.js";
import { createOrderService } from "./order.service.js";
import { createOrderController } from "./order.controller.js";
import { createOrderRoutes } from "./order.routes.js";

const repository = createOrderRepository();

const service = createOrderService(repository);

const controller = createOrderController(service);

export const orderRouter = createOrderRoutes(controller);
