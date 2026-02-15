"use client";

import { DashboardHeader } from "./dashboard-header";
import { DashboardStats } from "./dashboard-stats";
import { QuickActions } from "./quick-actions";
import { RecentActivity } from "./recent-activity";

export default function DashboardHome() {
  return (
    <div className="p-4 space-y-6">
      <DashboardHeader />
      <DashboardStats />
      <RecentActivity />
      <QuickActions />
    </div>
  );
}
