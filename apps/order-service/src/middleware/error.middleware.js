import { ZodError } from "zod";
import {
  ApiError,
  ValidationError,
  formatZodErrors,
  logger,
  buildErrorResponse,
} from "@microservices-demo/shared";

export function errorMiddleware(err, req, res, next) {
  if (err instanceof ZodError) {
    err = new ValidationError(formatZodErrors(err.issues));
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(buildErrorResponse(err));
  }

  logger.error({
    message: err.message,
    stack: err.stack,
  });

  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Internal Server Error",
  });
}
