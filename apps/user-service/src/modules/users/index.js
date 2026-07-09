import { createUserRepository } from "./user.repository.js";
import { createUserService } from "./user.service.js";
import { createUserController } from "./user.controller.js";
import { createUserRouter } from "./user.routes.js";

const repository = createUserRepository();

const service = createUserService(repository);

const controller = createUserController(service);

export const userRouter = createUserRouter(controller);
