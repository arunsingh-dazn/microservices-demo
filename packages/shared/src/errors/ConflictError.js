import { ApiError } from "./ApiError.js";
import { HTTP_STATUS } from "../constants/http-status.js";

export class ConflictError extends ApiError {
  constructor(message = "Conflict", details) {
    super({
      statusCode: HTTP_STATUS.CONFLICT,
      message,
      details,
    });
  }
}
