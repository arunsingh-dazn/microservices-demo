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

    refreshToken: async (req, res, next) => {
      try {
        const result = await service.refreshToken(req.body.refreshToken);

        return res.json(
          new ApiResponse({
            message: "Access token refreshed successfully.",
            data: result,
          }),
        );
      } catch (error) {
        next(error);
      }
    },

    logout: async (req, res, next) => {
      try {
        await service.logout(req.user.userId);

        return res.json(
          new ApiResponse({
            message: USER_MESSAGES.LOGOUT_SUCCESS,
          }),
        );
      } catch (error) {
        next(error);
      }
    },

    getUsers: async (req, res, next) => {
      try {
        const users = await service.getUsers();

        return res.json(
          new ApiResponse({
            message: USER_MESSAGES.USERS_FETCH_SUCCESS,
            data: users,
          }),
        );
      } catch (error) {
        next(error);
      }
    },

    deleteUser: async (req, res, next) => {
      try {
        console.log(req.params);

        await service.deleteUser(req.params.id);

        return res.json(
          new ApiResponse({
            statusCode: HTTP_STATUS.OK,
            message: USER_MESSAGES.USER_DELETE_SUCCESS,
          }),
        );
      } catch (error) {
        next(error);
      }
    },
  };
}
