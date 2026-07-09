export class ApiError extends Error {
  constructor({ statusCode, message, details }) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }
}
