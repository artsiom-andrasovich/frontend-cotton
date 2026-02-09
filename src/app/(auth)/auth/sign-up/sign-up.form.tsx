"use client";

import { errorCatch } from "@/api/error";
import { authService } from "@/services/auth.service";
import { SignUpSchema, type TSignUpForm } from "@/services/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { OAuthButtons } from "../oauth-buttons";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<TSignUpForm>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordRepeat: "",
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (data: TSignUpForm) => authService.signUp(data),
    onSuccess: (response) => {
      const params = new URLSearchParams({
        email: response.data.email,
        userId: response.data.id,
      });
      router.push(AppPaths.auth.CONFIRM + `?${params}`);
    },
    onError: (err) => {
      toast.error(errorCatch(err));
    },
  });

  const onSubmit = (data: TSignUpForm) => {
    signUpMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create account
        </h1>
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          Enter your information to create your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 dark:text-white">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your name"
                    disabled={signUpMutation.isPending}
                    className="h-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    disabled={signUpMutation.isPending}
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
                      disabled={signUpMutation.isPending}
                      className="h-12 pr-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={signUpMutation.isPending}
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
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordRepeat"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 dark:text-white">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    disabled={signUpMutation.isPending}
                    className="h-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {signUpMutation.isError && (
            <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/30 p-3 rounded-md">
              {errorCatch(signUpMutation.error)}
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12"
            disabled={signUpMutation.isPending}
          >
            {signUpMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </Form>
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

      <OAuthButtons />

      <div className="text-center text-sm">
        <span className="text-muted-foreground dark:text-gray-400">
          Already have an account?{" "}
        </span>
        <Link
          href={AppPaths.auth.SIGN_IN}
          className="font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

