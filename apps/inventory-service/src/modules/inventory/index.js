import { createInventoryRepository } from "./inventory.repository.js";
import { createInventoryService } from "./inventory.service.js";
import { createInventoryController } from "./inventory.controller.js";
import { createInventoryRoutes } from "./inventory.routes.js";

const repository = createInventoryRepository();

const service = createInventoryService(repository);

const controller = createInventoryController(service);

export const inventoryRouter = createInventoryRoutes(controller);
