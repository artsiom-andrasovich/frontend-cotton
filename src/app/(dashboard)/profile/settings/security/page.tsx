"use client";

import { Navbar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { AppPaths } from "@/constants";
import { Shield } from "lucide-react";
//TODO:
export default function SecuritySettingsPage() {
  return (
    <>
      <Navbar title={"Security Settings"} path={AppPaths.settings.SETTINGS} />
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Security
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account security and privacy
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-3" />
              Privacy Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-3" />
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
