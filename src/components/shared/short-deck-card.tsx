"use client";

import { AppPaths, colorMapDeckCard as colorMap } from "@/constants";
import { cn } from "@/lib/utils";
import { RecentActivityItem } from "@/services/types";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { ComponentProps } from "react";
import { CategoryIcon } from "./category-icon";

type ShortDeckCardProps = {
  activity: RecentActivityItem;
  className?: string;
} & ComponentProps<"div">;
const fallback = colorMap.blue;
export function ShortDeckCard({
  activity,
  className,
  ...props
}: ShortDeckCardProps) {
  const color = activity.color;
  const colorClasses = colorMap[color as keyof typeof colorMap] || fallback;
  return (
    <Link href={AppPaths.deck.GET_DECK(activity.id)} className="block">
      <div
        {...props}
        className={cn(
          "bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-pointer",
          className,
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 ${colorClasses.iconBg} rounded-lg flex items-center justify-center shadow-sm`}
            >
              <CategoryIcon
                type={activity.icon as any}
                className={`w-5 h-5 ${colorClasses.icon}`}
              />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white hover:text-primary transition-colors">
                {activity.title}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Last studied{" "}
                <span suppressHydrationWarning>
                  {formatDistanceToNow(new Date(activity.lastStudied), {
                    addSuffix: true,
                  })}
                </span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {activity.mastery}%
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Mastery</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
