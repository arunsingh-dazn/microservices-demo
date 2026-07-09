import { ApiError } from "./ApiError.js";
import { HTTP_STATUS } from "../constants/http-status.js";

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden", details) {
    super({
      statusCode: HTTP_STATUS.FORBIDDEN,
      message,
      details,
    });
  }
}
