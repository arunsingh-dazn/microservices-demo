import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { loginUserSchema, registerUserSchema } from "./user.schema.js";

export function createUserRouter(controller) {
  const router = Router();

  router.post("/register", validate(registerUserSchema), controller.register);
  router.post("/login", validate(loginUserSchema), controller.login);

  return router;
}
