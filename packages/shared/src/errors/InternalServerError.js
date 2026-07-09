import { ApiError } from "./ApiError.js";
import { HTTP_STATUS } from "../constants/http-status.js";

export class InternalServerError extends ApiError {
  constructor(message = "Internal Server Error", details) {
    super({
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message,
      details,
    });
  }
}
