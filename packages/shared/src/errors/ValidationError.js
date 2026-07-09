import { ApiError } from "./ApiError.js";
import { HTTP_STATUS } from "../constants/http-status.js";

export class ValidationError extends ApiError {
  constructor(details) {
    super({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Validation Failed",
      details,
    });
  }
}
