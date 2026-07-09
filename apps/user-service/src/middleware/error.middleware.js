import { ZodError } from "zod";
import { ApiError } from "@microservices-demo/shared";
import { formatZodErrors } from "@microservices-demo/shared";

export function errorMiddleware(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Validation Failed",
      errors: formatZodErrors(err.issues),
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      details: err.details,
    });
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Internal Server Error",
  });
}
