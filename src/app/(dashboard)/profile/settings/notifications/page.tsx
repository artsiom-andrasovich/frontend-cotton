"use client";

import { Navbar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { AppPaths } from "@/constants";
//TODO:
export default function NotificationsSettingsPage() {
  return (
    <>
      <Navbar
        title={"Notifications Settings"}
        path={AppPaths.settings.SETTINGS}
      />
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Control your notification preferences
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Study Reminders
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get notified to study your cards
                </p>
              </div>
              <Button variant="outline" size="sm">
                On
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Achievement Alerts
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Celebrate your learning milestones
                </p>
              </div>
              <Button variant="outline" size="sm">
                On
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Email Updates
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive weekly progress reports
                </p>
              </div>
              <Button variant="outline" size="sm">
                Off
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
