import jwt from "jsonwebtoken";

/**
 * Generate JWT Access Token
 */
export function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
/**
 * Verify JWT Access Token
 */
export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
