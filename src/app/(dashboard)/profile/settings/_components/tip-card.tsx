"use client";

import { LucideIcon } from "lucide-react";

const TIP_COLORS: Record<string, string> = {
  indigo: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-500",
  yellow: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-500",
  green: "bg-green-100 dark:bg-green-900/40 text-green-500",
  purple: "bg-purple-100 dark:bg-purple-900/40 text-purple-500",
};

export interface TipCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "indigo" | "yellow" | "green" | "purple" | string;
}

export function TipCard({
  icon: Icon,
  title,
  description,
  color,
}: TipCardProps) {
  return (
    <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className={`inline-flex p-1.5 rounded-lg mb-2 ${TIP_COLORS[color]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="font-medium text-gray-900 dark:text-white text-sm">
        {title}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
        {description}
      </p>
    </div>
  );
}
