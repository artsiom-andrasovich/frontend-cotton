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

const EmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type TEmailForm = z.infer<typeof EmailSchema>;

interface EmailFormProps {
  onEmailSubmitted: (email: string) => void;
}

export function EmailForm({ onEmailSubmitted }: EmailFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<TEmailForm>({
    resolver: zodResolver(EmailSchema),
    defaultValues: { email: "" },
  });

  const handleEmailSubmit = async (data: TEmailForm) => {
    try {
      setIsLoading(true);
      setError("");

      console.log("Requesting password reset for:", data.email);

      await resetPasswordService.getResetPasswordCode(data.email);
      const { toast } = await import("react-hot-toast");
      toast.success("Verification code sent to your email");

      onEmailSubmitted(data.email);
    } catch (err) {
      setError(errorCatch(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Forgot password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we&apos;ll send you a verification code
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleEmailSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
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
