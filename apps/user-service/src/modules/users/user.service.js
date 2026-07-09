import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "@microservices-demo/shared";
import { HTTP_STATUS } from "@microservices-demo/shared";
import { USER_MESSAGES } from "./user.constants.js";
import { toUserResponse } from "./user.mapper.js";

export function createUserService(repository) {
  return {
    async register(payload) {
      const existingUser = await repository.findByEmail(payload.email);

      if (existingUser) {
        throw new ApiError({
          statusCode: HTTP_STATUS.CONFLICT,
          message: USER_MESSAGES.USER_ALREADY_EXISTS,
        });
      }

      const hashedPassword = await bcrypt.hash(payload.password, 10);

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
        throw new ApiError({
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          message: "Invalid email or password",
        });
      }

      console.log("Login Payload:", payload);
      console.log("User from DB:", user);
      console.log("Stored Password:", user?.password);

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new ApiError({
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          message: "Invalid email or password",
        });
      }

      const accessToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
      );

      return {
        user: toUserResponse(user),
        accessToken,
      };
    },
  };
}
