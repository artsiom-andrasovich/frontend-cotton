"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AppPaths } from "@/constants";
import { authService } from "@/services/auth.service";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ConfirmFormProps {
  userId?: string;
  email?: string;
}

export function ConfirmForm({ userId, email }: ConfirmFormProps) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (otp.length === 6) {
      confirmCode();
    }
  }, [otp]);

  if (!userId || !email) {
    router.push(AppPaths.SIGN_IN);
    return null;
  }

  const confirmCode = async () => {
    if (otp.length === 6) {
      try {
        setIsLoading(true);
        setIsSubmitted(true);
        setError("");

        await authService.activateAccount({ userId, code: otp });
        const { toast } = await import("react-hot-toast");
        toast.success("Your account has been activated");

        router.push(AppPaths.HOME);
      } catch {
        setError("Invalid or expired verification code. Please try again.");
        setIsSubmitted(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      setError("");

      await authService.resendActivationCode(email);

      setError("Verification code has been resent to your email.");
    } catch {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
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
            disabled={isLoading || isSubmitted}
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

        {isLoading && (
          <div className="text-center">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground mt-2">Verifying...</p>
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md text-center">
            {error}
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
          onClick={handleResendCode}
          disabled={isLoading}
        >
          Resend
        </Button>
      </div>
    </div>
  );
}
