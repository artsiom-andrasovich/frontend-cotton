"use client";

import { errorCatch } from "@/api/error";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AppPaths } from "@/constants";
import { resetPasswordService } from "@/services/reset-password.service";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface OTPFormProps {
  usernameOrEmail: string;
  onCodeSubmitted: (code: string, userId: string) => void;
}

export function OTPForm({ usernameOrEmail, onCodeSubmitted }: OTPFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");

  // Auto-submit OTP when 6 digits are entered
  useEffect(() => {
    if (otp.length === 6 && !isLoading) {
      handleOTPSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp, isLoading]);

  const handleOTPSubmit = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await resetPasswordService.verifyCode({
        usernameOrEmail: usernameOrEmail,
        code: otp,
      });

      const { toast } = await import("react-hot-toast");
      toast.success("Code verified successfully");
      // Pass both the code and the userId returned from verification
      onCodeSubmitted(otp, response.userId);
    } catch (err) {
      setError(errorCatch(err));
      setOtp("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Enter verification code
        </h1>
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a 6-digit code to{" "}
          <span className="font-medium">{usernameOrEmail}</span>
        </p>
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
            disabled={isLoading}
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
          <div className="text-sm text-red-600 dark:bg-red-900/30 bg-red-50 p-3 rounded-md text-center">
            {error}
          </div>
        )}
      </div>

      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={async () => {
              await resetPasswordService.getResetPasswordCode(usernameOrEmail);
            }}
            className="text-primary hover:underline font-medium"
            disabled={isLoading}
          >
            Resend code
          </button>
        </p>

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
