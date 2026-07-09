import { z } from "zod";

export const registerUserSchema = z.object({
  firstName: z.string().trim().min(2, "First name must be at least 2 characters"),

  lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),

  email: z.string().trim().email("Please provide a valid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginUserSchema = z.object({
  email: z.string().trim().email("Invalid email"),

  password: z.string().min(8),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().trim().min(1, "Refresh token is required"),
});

export const updateUserSchema = z
  .object({
    firstName: z.string().trim().min(2).max(50).optional(),
    lastName: z.string().trim().min(2).max(50).optional(),
  })
  .refine((data) => data.firstName !== undefined || data.lastName !== undefined, {
    message: "At least one field must be provided for update.",
  });
