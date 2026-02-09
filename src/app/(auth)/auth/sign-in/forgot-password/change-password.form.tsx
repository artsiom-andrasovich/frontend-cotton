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
import { AppPaths, passwordComplexity } from "@/constants";
import { resetPasswordService } from "@/services/reset-password.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const passwordResetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordComplexity,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    passwordRepeat: z.string(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords don't match",
    path: ["passwordRepeat"],
  });

type PasswordResetFormData = z.infer<typeof passwordResetSchema>;

type ChangePasswordFormProps = {
  code: string;
  email: string;
};

export function ChangePasswordForm({ code, email }: ChangePasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();

  const form = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: "",
      passwordRepeat: "",
    },
  });

  const resetMutation = useMutation({
    mutationFn: (data: PasswordResetFormData) =>
      resetPasswordService.resetPasswordByCode({
        code,
        email,
        ...data,
      }),
    onSuccess: () => {
      toast.success("Password reset successfully");
      push(AppPaths.auth.SIGN_IN);
    },
    onError: (err) => {
      toast.error(errorCatch(err));
    },
  });

  const handlePasswordSubmit = (data: PasswordResetFormData) => {
    resetMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Reset password</h1>
        <p className="text-sm text-muted-foreground">Enter your new password</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePasswordSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      disabled={resetMutation.isPending}
                      className="h-12 pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      disabled={resetMutation.isPending}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
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
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      disabled={resetMutation.isPending}
                      className="h-12 pr-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {resetMutation.isError && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {errorCatch(resetMutation.error)}
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12"
            disabled={resetMutation.isPending}
          >
            {resetMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resetting...
              </>
            ) : (
              "Reset password"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

