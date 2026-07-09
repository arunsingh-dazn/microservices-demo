import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { registerUserSchema } from "./user.schema.js";

export function createUserRouter(controller) {
  const router = Router();

  router.post("/register", validate(registerUserSchema), controller.register);

  return router;
}
