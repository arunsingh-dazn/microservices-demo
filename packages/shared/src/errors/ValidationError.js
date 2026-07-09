import { ApiError } from "./ApiError.js";

export class ValidationError extends ApiError {
  constructor(details) {
    super({
      statusCode: 400,
      message: "Validation Failed",
      details,
    });
  }
}
