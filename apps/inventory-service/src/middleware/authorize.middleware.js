import { ForbiddenError } from "@microservices-demo/shared";

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ForbiddenError("User is not authenticated."));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError("You are not authorized to perform this action."));
    }

    next();
  };
}
