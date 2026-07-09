import {
  comparePassword,
  ConflictError,
  generateAccessToken,
  generateRefreshToken,
  NotFoundError,
  UnauthorizedError,
  verifyRefreshToken,
} from "@microservices-demo/shared";
import { USER_MESSAGES } from "./user.constants.js";
import { toUserResponse } from "./user.mapper.js";
import { hashPassword } from "@microservices-demo/shared";

export function createUserService(repository) {
  return {
    async register(payload) {
      const existingUser = await repository.findByEmail(payload.email);

      if (existingUser) {
        throw new ConflictError(USER_MESSAGES.USER_ALREADY_EXISTS);
      }

      const hashedPassword = await hashPassword(payload.password);
      const user = await repository.create({
        ...payload,
        password: hashedPassword,
      });

      return toUserResponse(user);
    },

    async login(payload) {
      const { email, password } = payload;

      const user = await repository.findByEmailForLogin(email);

      if (!user) {
        throw new UnauthorizedError(USER_MESSAGES.INVALID_CREDENTIALS);
      }

      console.log("Login Payload:", payload);
      console.log("User from DB:", user);
      console.log("Stored Password:", user?.password);

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedError(USER_MESSAGES.INVALID_CREDENTIALS);
      }

      const accessToken = generateAccessToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      const refreshToken = generateRefreshToken({
        userId: user._id.toString(),
      });

      await repository.updateRefreshToken(user._id, refreshToken);

      return {
        user: toUserResponse(user),
        accessToken,
        refreshToken,
      };
    },
    async getProfile(userId) {
      const user = await repository.findById(userId);

      if (!user) {
        throw new NotFoundError(USER_MESSAGES.USER_NOT_FOUND);
      }

      return toUserResponse(user);
    },

    async refreshToken(token) {
      const payload = verifyRefreshToken(token);

      const user = await repository.findById(payload.userId);

      if (!user) {
        throw new UnauthorizedError(USER_MESSAGES.INVALID_REFRESH_TOKEN);
      }

      if (user.refreshToken !== token) {
        throw new UnauthorizedError(USER_MESSAGES.INVALID_REFRESH_TOKEN);
      }

      const accessToken = generateAccessToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      return {
        accessToken,
      };
    },
  };
}
