"use client";

import { Navbar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { AppPaths } from "@/constants";
import { Shield } from "lucide-react";
import Link from "next/link";
//TODO:
export default function SecuritySettingsPage() {
  return (
    <>
      <Navbar title={"Security Settings"} path={AppPaths.settings.SETTINGS} />
      <div className="p-4 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="space-y-3">
            {/* <Button variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-3" />
              Privacy Settings
            </Button> */}

            <Button asChild variant="outline" className="w-full justify-start">
              <Link href={AppPaths.security.CHANGE_PASSWORD}>
                <Shield className="w-4 h-4 mr-3" />
                Change Password
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
