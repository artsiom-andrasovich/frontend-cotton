import { regexPatterns } from "@/constants/app.constants";
import { z } from "zod";

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .regex(regexPatterns.username, {
      message:
        "Invalid username format. Only letters, numbers, and underscores allowed.",
    })
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional()
    .or(z.literal("")),
  firstName: z.string().optional().or(z.literal("")),
  lastName: z.string().optional().or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
