import { z } from "zod";

export const registerUserSchema = z.object({
  firstName: z.string().trim().min(2, "First name must be at least 2 characters"),

  lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),

  email: z.string().trim().email("Please provide a valid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginUserSchema = z.object({
  email: z.email(),

  password: z.string().min(8),
});
