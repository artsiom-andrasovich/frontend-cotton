"use client";

import { LucideIcon } from "lucide-react";

export interface CreditItemProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
}

export function CreditItem({
  icon: Icon,
  iconColor,
  title,
  description,
}: CreditItemProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${iconColor}`} />
      <div>
        <p className="text-gray-900 dark:text-white font-medium text-sm">
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}
