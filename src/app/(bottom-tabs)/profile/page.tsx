"use client";

import { Button } from "@/components/ui/button";
import { AppPaths } from "@/constants/app.paths";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { ProfileHeader } from "./profile-header";

import { useLogout } from "@/hooks";
import { AchievementsSection } from "./achievements-section";
import { StatsSection } from "./stats-section";

export default function ProfilePage() {
  const { logout, isLoading } = useLogout();
  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <ProfileHeader />

      {/* Stats Grid */}
      <StatsSection />
      {/* Achievements (Coming Soon) */}
      <AchievementsSection />

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
          onClick={logout}
          disabled={isLoading}
        >
          <LogOut className="w-4 h-4 mr-3" />
          {isLoading ? "Signing Out" : "Sign Out"}
        </Button>
      </div>
    </div>
  );
}
