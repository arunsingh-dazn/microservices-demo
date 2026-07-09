export function buildErrorResponse(error) {
  const response = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
  };

  if (error.details !== undefined) {
    response.details = error.details;
  }

  return response;
}
