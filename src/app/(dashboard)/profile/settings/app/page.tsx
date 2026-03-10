"use client";

import { Navbar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AppPaths } from "@/constants";
import { Globe, Volume2 } from "lucide-react";
//TODO:
export default function AppSettingsPage() {
  return (
    <>
      <Navbar title={"App Settings"} path={AppPaths.settings.SETTINGS} />
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            App
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize appearance and study preferences
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Theme
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose your preferred theme
                </p>
              </div>
              <ThemeToggle />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Sound Effects
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Play sounds during study sessions
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Cards per Session
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Number of cards to study at once
                </p>
              </div>
              <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-base md:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>50</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Auto-advance
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatically show next card
                </p>
              </div>
              <Button variant="outline" size="sm">
                Off
              </Button>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Globe className="w-4 h-4 mr-3" />
                Language & Region
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
