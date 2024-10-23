import { z } from "zod";
import { Roles } from "../enums/role";

// TODO: i18n.
const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .trim()
    .min(5, "Please enter name.")
    .max(255, "Input length exceeds limit.（255characters）"),
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .min(1, "Please enter email address.")
    .email("Please enter a valid email address."),
  password: z
    .string({ required_error: "Password is required." })
    .trim()
    .min(1, "Please enter a password.")
    .min(8, "Password must be at least 8 characters long."),
    role: z.nativeEnum(Roles, {
      required_error: 'Please select a suitable role.',
    }),
});

export { registerSchema };
