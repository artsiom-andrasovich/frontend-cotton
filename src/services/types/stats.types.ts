export type RecentActivityItem = {
  id: string;
  title: string;
  icon: string;
  color: string;
  lastStudied: string;
  mastery: number;
};

export type DashboardStatsResponse = {
  totalDecks: number;
  studyTimeHours: number;
  recentActivity: RecentActivityItem[];
};
