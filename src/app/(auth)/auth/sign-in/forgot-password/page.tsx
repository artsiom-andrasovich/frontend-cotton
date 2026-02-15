"use client";

import { JSX, useState } from "react";
import { ChangePasswordForm } from "./change-password.form";
import { EmailForm } from "./email.form";
import { OTPForm } from "./otp.form";

export default function ForgotPasswordPage() {
  type TStep = "email" | "otp" | "change-password";
  const [step, setStep] = useState<TStep>("email");

  type TData = {
    usernameOrEmail: string | undefined;
    code: string | undefined;
    userId: string | undefined;
  };
  const [data, setData] = useState<TData>({
    code: undefined,
    usernameOrEmail: undefined,
    userId: undefined,
  });

  const handleEmailSubmit = (val: string) => {
    setData((prev) => ({
      ...prev,
      usernameOrEmail: val,
    }));
    setStep("otp");
  };

  const handleOtpSubmit = (code: string, userId: string) => {
    setData((prev) => ({
      ...prev,
      code,
      userId,
    }));
    setStep("change-password");
  };

  const Components: Record<TStep, JSX.Element> = {
    email: <EmailForm onEmailSubmitted={handleEmailSubmit} />,
    otp: (
      <OTPForm
        onCodeSubmitted={handleOtpSubmit}
        usernameOrEmail={data.usernameOrEmail as string}
      />
    ),
    "change-password": (
      <ChangePasswordForm
        code={data.code as string}
        userId={data.userId as string}
      />
    ),
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">{Components[step]}</div>
    </div>
  );
}
