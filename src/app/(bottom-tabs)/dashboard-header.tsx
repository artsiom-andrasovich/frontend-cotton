"use client";

import { useProfile } from "@/hooks/use-profile.hook";

export function DashboardHeader() {
  const { displayName } = useProfile();

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Welcome back, {displayName || "User"}!
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Ready to continue learning?
      </p>
    </div>
  );
}
