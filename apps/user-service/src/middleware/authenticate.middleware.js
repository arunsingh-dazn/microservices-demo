import { UnauthorizedError, verifyAccessToken } from "@microservices-demo/shared";

export function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError("Authorization header is missing.");
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      throw new UnauthorizedError("Invalid authorization header.");
    }

    const payload = verifyAccessToken(token);

    req.user = payload;

    next();
  } catch (error) {
    next(new UnauthorizedError("Invalid or expired access token."));
  }
}
