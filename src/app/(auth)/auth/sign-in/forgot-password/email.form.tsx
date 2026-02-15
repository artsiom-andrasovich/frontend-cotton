"use client";

import { errorCatch } from "@/api/error";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppPaths } from "@/constants";
import { resetPasswordService } from "@/services/reset-password.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UsernameOrEmailSchema = z.object({
  usernameOrEmail: z.string().min(1, { message: "Value is required" }),
});

type TEmailForm = z.infer<typeof UsernameOrEmailSchema>;

interface EmailFormProps {
  onEmailSubmitted: (usernameOrEmail: string) => void;
}

export function EmailForm({ onEmailSubmitted }: EmailFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<TEmailForm>({
    resolver: zodResolver(UsernameOrEmailSchema),
    defaultValues: { usernameOrEmail: "" },
  });

  const handleEmailSubmit = async (data: TEmailForm) => {
    try {
      setIsLoading(true);
      setError("");

      console.log("Requesting password reset for:", data.usernameOrEmail);

      await resetPasswordService.getResetPasswordCode(data.usernameOrEmail);
      const { toast } = await import("react-hot-toast");
      toast.success("Verification code sent to your email");

      onEmailSubmitted(data.usernameOrEmail);
    } catch (err) {
      setError(errorCatch(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Forgot password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email or username and we&apos;ll send you a verification
          code
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleEmailSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="usernameOrEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your email or username"
                    disabled={isLoading}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full h-12" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send verification code"
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <Link
          href={AppPaths.auth.SIGN_IN}
          className="inline-flex items-center text-sm text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
