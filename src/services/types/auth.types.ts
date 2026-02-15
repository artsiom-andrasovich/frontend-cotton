import { passwordComplexity, regexPatterns } from "@/constants";
import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z
      .string()
      .min(3, { message: "username must be at least 3 characters long" })
      .max(20, { message: "username must be at most 20 characters long" })
      .regex(regexPatterns.username, {
        message:
          "The string must contain only Latin letters and up to 5 underscores",
      }),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 characters long" })
      .max(50, { message: "name must be at most 50 characters long" })
      .regex(passwordComplexity, {
        message:
          "password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character",
      }),
    passwordRepeat: z.string(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "passwords do not match",
    path: ["passwordRepeat"],
  });

export type TSignUpForm = z.infer<typeof SignUpSchema>;
export type TSignUpRes = {
  id: string;
  email: string;
};

export const SignInSchema = z.object({
  login: z.string().min(1, { message: "Login is required" }),
  password: z.string().min(8).max(50),
});
export type TSignInForm = z.infer<typeof SignInSchema>;

export type TAuthResponse = {
  accessToken: string;
};
