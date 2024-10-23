import { z } from "zod";

// TODO: i18n.
const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .trim()
    .min(1, "Please enter your name."),
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .min(1, "Please enter a valid email address")
    .email("Please enter a valid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(1, "Please enter a password")
    .min(8, "Password must be at least 8 characters long."),
  role: z.enum(["Doctor", "Patient", "Others"]),
});

export { registerSchema };
