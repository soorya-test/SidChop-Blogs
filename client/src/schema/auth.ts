import { z } from "zod";

const nameRegex = /^[a-zA-Z\s]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-]).{8,}$/;

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "This Field is Required" })
    .regex(nameRegex, { message: "Name must contain only Alphabets" }),
  email: z.string().min(1, { message: "This Field is Required" }).email({
    message: "Enter a Valid Email",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(passwordRegex, {
      message:
        "Password must be at least a uppercase letter, a lowercase letter, a digit, and a special symbol.",
    }),
});

export const loginSchema = signUpSchema.omit({ fullName: true });

export type TSignUp = z.infer<typeof signUpSchema>;
export type TLogin = z.infer<typeof loginSchema>;
