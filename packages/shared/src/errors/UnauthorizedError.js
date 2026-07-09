import { ApiError } from "./ApiError.js";

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super({
      statusCode: 401,
      message,
    });
  }
}
