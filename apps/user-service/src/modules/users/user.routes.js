import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { loginUserSchema, refreshTokenSchema, registerUserSchema } from "./user.schema.js";
import { authenticate } from "../../middleware/authenticate.middleware.js";

export function createUserRouter(controller) {
  const router = Router();

  router.post("/register", validate(registerUserSchema), controller.register);
  router.post("/login", validate(loginUserSchema), controller.login);
  router.get("/me", authenticate, controller.getProfile);
  router.post("/refresh-token", validate(refreshTokenSchema), controller.refreshToken);

  return router;
}
