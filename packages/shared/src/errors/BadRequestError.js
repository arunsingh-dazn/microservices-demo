import { ApiError } from "./ApiError.js";
import { HTTP_STATUS } from "@microservices-demo/shared";

export class BadRequestError extends ApiError {
  constructor(message = "Bad Request", details) {
    super({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message,
      details,
    });
  }
}
