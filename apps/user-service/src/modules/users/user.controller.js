import { ApiResponse, HTTP_STATUS } from "@microservices-demo/shared";
import { USER_MESSAGES } from "./user.constants.js";

export function createUserController(service) {
  return {
    register: async (req, res, next) => {
      try {
        const user = await service.register(req.body);

        return res.status(HTTP_STATUS.CREATED).json(
          new ApiResponse({
            statusCode: HTTP_STATUS.CREATED,
            message: USER_MESSAGES.REGISTER_SUCCESS,
            data: user,
          }),
        );
      } catch (error) {
        next(error);
      }
    },

    login: async (req, res, next) => {
      try {
        const result = await service.login(req.body);

        return res.json(
          new ApiResponse({
            message: "Login Successful",
            data: result,
          }),
        );
      } catch (err) {
        next(err);
      }
    },

    getProfile: async (req, res, next) => {
      try {
        const user = await service.getProfile(req.user.userId);

        return res.json(
          new ApiResponse({
            message: "Profile fetched successfully.",
            data: user,
          }),
        );
      } catch (error) {
        next(error);
      }
    },
  };
}
