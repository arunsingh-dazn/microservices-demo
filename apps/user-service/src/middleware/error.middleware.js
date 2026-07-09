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
    const response = {
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    };

    if (err.details) {
      response.details = err.details;
    }

    return res.status(err.statusCode).json(response);
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Internal Server Error",
  });
}
