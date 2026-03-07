"use client";

import { Navbar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { APP_NAME, APP_VERSION, AppPaths } from "@/constants";
import { HelpCircle, Info } from "lucide-react";
//TODO:
export default function AboutSettingsPage() {
  return (
    <>
      <Navbar title={"About"} path={AppPaths.settings.SETTINGS} />
      <div className="p-4 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          {/* <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              About
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Information about Cotton and support
            </p>
          </div> */}

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="w-4 h-4 mr-3" />
              Help & Support
            </Button>

            <Button variant="outline" className="w-full justify-start">
              <Info className="w-4 h-4 mr-3" />
              About {APP_NAME}
            </Button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            {APP_NAME} v{APP_VERSION}
          </p>
        </div>
      </div>
    </>
  );
}
