import { passwordComplexity } from "@/constants";
import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().default("").optional(),
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

export type TUpdatePassword = z.infer<typeof updatePasswordSchema>;
