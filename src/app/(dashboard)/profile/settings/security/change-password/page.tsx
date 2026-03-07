"use client";

import { Navbar } from "@/components/shared";
import { AppPaths } from "@/constants";
import { ChangePasswordForm } from "./change-password.form";

export default function ChangePasswordPage() {
  return (
    <>
      <Navbar title={"Change Password"} path={AppPaths.settings.SECURITY} />
      <div className="p-4 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <ChangePasswordForm />
        </div>
      </div>
    </>
  );
}
