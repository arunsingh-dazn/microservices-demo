import bcrypt from "bcryptjs";

const DEFAULT_SALT_ROUNDS = 10;

/**
 * Hash a plain text password.
 */
export async function hashPassword(password, saltRounds = DEFAULT_SALT_ROUNDS) {
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compare plain text password with hashed password.
 */
export async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}
