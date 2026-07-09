import { ApiError } from "./ApiError.js";
import { HTTP_STATUS } from "../constants/http-status.js";

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized", details) {
    super({
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message,
      details,
    });
  }
}
