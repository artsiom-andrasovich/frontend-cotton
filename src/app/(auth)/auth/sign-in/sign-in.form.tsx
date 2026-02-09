"use client";

import { errorCatch } from "@/api/error";
import { authService } from "@/services/auth.service";
import { SignInSchema, type TSignInForm } from "@/services/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { AppPaths } from "@/constants";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { OAuthButtons } from "../oauth-buttons";

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<TSignInForm>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // TODO: change on react-query
  const onSubmit = async (data: TSignInForm) => {
    try {
      setIsLoading(true);
      setError("");
      await authService.signIn(data);
      router.push("/"); // Redirect to home page after successful sign-in
    } catch (err) {
      setError(errorCatch(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          Enter your credentials to sign in to your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 dark:text-white">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    disabled={isLoading}
                    className="h-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 dark:text-white">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      className="h-12 pr-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
                <div className="text-right">
                  <Link
                    href={AppPaths.auth.FORGOT_PASSWORD}
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </FormItem>
            )}
          />

          {error && (
            <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/30 p-3 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full h-12" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-gray-800 px-2 text-muted-foreground dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      {/* OAuth Buttons */}
      <OAuthButtons />

      <div className="text-center text-sm">
        <span className="text-muted-foreground dark:text-gray-400">
          Don&apos;t have an account?{" "}
        </span>
        <Link
          href={AppPaths.auth.SIGN_UP}
          className="font-semibold text-primary hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
