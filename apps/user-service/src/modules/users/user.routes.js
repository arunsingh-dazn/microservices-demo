import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import {
  loginUserSchema,
  refreshTokenSchema,
  registerUserSchema,
  updateUserSchema,
} from "./user.schema.js";
import { authenticate } from "../../middleware/authenticate.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

export function createUserRouter(controller) {
  const router = Router();

  router.post("/register", validate(registerUserSchema), controller.register);
  router.post("/login", validate(loginUserSchema), controller.login);
  router.get("/me", authenticate, controller.getProfile);
  router.post("/refresh-token", validate(refreshTokenSchema), controller.refreshToken);
  router.post("/logout", authenticate, controller.logout);

  router.get("/", authenticate, authorize("ADMIN"), controller.getUsers);
  router.delete("/:id", authenticate, authorize("ADMIN"), controller.deleteUser);
  router.get("/:id", authenticate, authorize("ADMIN"), controller.getUserById);
  router.patch(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    validate(updateUserSchema),
    controller.updateUser,
  );

  return router;
}
