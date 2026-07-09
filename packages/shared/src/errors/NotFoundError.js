import { ApiError } from "./ApiError.js";

export class NotFoundError extends ApiError {
  constructor(resource = "Resource") {
    super({
      statusCode: 404,
      message: `${resource} not found`,
    });
  }
}
