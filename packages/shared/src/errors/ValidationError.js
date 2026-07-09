import { ApiError } from "./ApiError.js";
import { HTTP_STATUS } from "../constants/http-status.js";

export class ValidationError extends ApiError {
  constructor(details, message = "Validation Failed") {
    super({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message,
      details,
    });
  }
}
