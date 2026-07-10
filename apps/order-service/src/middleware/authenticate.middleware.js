import { UnauthorizedError, verifyAccessToken } from "@microservices-demo/shared";

export function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError("Authorization header is required.");
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer") {
      throw new UnauthorizedError("Authorization scheme must be Bearer.");
    }

    if (!token) {
      throw new UnauthorizedError("Access token is required.");
    }

    req.user = verifyAccessToken(token);

    console.log("Decoded JWT:", req.user);

    next();
  } catch (error) {
    next(error);
  }
}
