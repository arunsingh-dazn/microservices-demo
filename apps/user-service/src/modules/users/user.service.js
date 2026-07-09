import bcrypt from "bcryptjs";

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
  };
}
