"use client";

import { Button } from "@/components/ui/button";
import { AppPaths } from "@/constants/app.paths";
import { BookOpen, Clock, LogOut, Settings, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ProfileHeader } from "./profile-header";

export default function ProfilePage() {
  const userStats = [
    {
      label: "Total Decks",
      value: "12",
      icon: BookOpen,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      label: "Study Time",
      value: "2.5h",
      icon: Clock,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      label: "Cards Mastered",
      value: "156",
      icon: TrendingUp,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <ProfileHeader />

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {userStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center"
            >
              <div
                className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2`}
              >
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
      {/*TODO: */}
      {/* Recent Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Achievements
        </h2>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Completed React Hooks Deck
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Achieved 92% mastery
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Study Streak
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                7 days in a row
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href={AppPaths.settings.SETTINGS}>
            <Settings className="w-4 h-4 mr-3" />
            Account Settings
          </Link>
        </Button>

        {/*TODO: */}
        <Button
          variant="outline"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
