"use client";

import { JSX, useState } from "react";
import { ChangePasswordForm } from "./change-password.form";
import { EmailForm } from "./email.form";
import { OTPForm } from "./otp.form";

export default function ForgotPasswordPage() {
  type TStep = "email" | "otp" | "change-password";
  const [step, setStep] = useState<TStep>("email");

  type TData = {
    email: string | undefined;
    code: string | undefined;
  };
  const [data, setData] = useState<TData>({
    code: undefined,
    email: undefined,
  });
  const handleSubmit = (val: string) => {
    if (step === "email") {
      setData((prev) => ({
        ...prev,
        email: val,
      }));
      setStep("otp");
    } else if (step === "otp") {
      setData((prev) => ({
        ...prev,
        code: val,
      }));
      setStep("change-password");
    }
  };
  const Components: Record<TStep, JSX.Element> = {
    email: <EmailForm onEmailSubmitted={handleSubmit} />,
    otp: (
      <OTPForm onCodeSubmitted={handleSubmit} email={data.email as string} />
    ),
    "change-password": (
      <ChangePasswordForm
        code={data.code as string}
        email={data.email as string}
      />
    ),
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">{Components[step]}</div>
    </div>
  );
}
