"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AppPaths } from "@/constants";
import { authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ConfirmFormProps {
  userId?: string;
  email?: string;
}
//TEST:
//TODO:
export function ConfirmForm({ userId, email }: ConfirmFormProps) {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const confirmMutation = useMutation({
    mutationFn: (code: string) =>
      authService.activateAccount({ userId: userId!, code }),
    onSuccess: () => {
      toast.success("Your account has been activated");
      router.push(AppPaths.HOME);
    },
    onError: () => {
      setOtp("");
    },
  });

  const resendMutation = useMutation({
    mutationFn: () => authService.resendActivationCode(email!),
    onSuccess: () => {
      toast.success("Verification code has been resent to your email.");
    },
    onError: () => {
      toast.error("Failed to resend code. Please try again.");
    },
  });

  useEffect(() => {
    if (otp.length === 6 && !confirmMutation.isPending) {
      confirmMutation.mutate(otp);
    }
  }, [otp]);

  if (!userId || !email) {
    router.push(AppPaths.auth.SIGN_IN);
    return null;
  }

  const isLoading = confirmMutation.isPending || resendMutation.isPending;

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Verify your email</h1>
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a verification code to
        </p>
        <p className="text-sm font-medium text-foreground">{email}</p>
      </div>

      <div className="space-y-4">
        <div className="text-center flex flex-col items-center justify-center">
          <label className="text-sm font-medium mb-4 block">
            Enter the 6-digit code
          </label>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            disabled={isLoading || confirmMutation.isSuccess}
            className="justify-center"
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup className="justify-center">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {confirmMutation.isPending && (
          <div className="text-center">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground mt-2">Verifying...</p>
          </div>
        )}

        {confirmMutation.isError && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md text-center">
            Invalid or expired verification code. Please try again.
          </div>
        )}
      </div>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">
          Didn&apos;t receive the code?{" "}
        </span>
        <Button
          variant="link"
          className="p-0 h-auto font-semibold"
          onClick={() => resendMutation.mutate()}
          disabled={isLoading}
        >
          {resendMutation.isPending ? "Sending..." : "Resend"}
        </Button>
      </div>
    </div>
  );
}
