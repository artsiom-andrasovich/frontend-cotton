"use client";

import { ChevronRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import { ElementType } from "react";

export interface SettingItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  external?: boolean;
  compact?: boolean;
}

export function SettingItem({
  icon: Icon,
  title,
  description,
  href,
  external,
  compact,
}: SettingItemProps) {
  const Component = (external ? "a" : Link) as ElementType;
  const extraProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Component
      href={href}
      {...extraProps}
      className={`flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <div
        className={`flex items-center ${compact ? "space-x-3" : "space-x-4"}`}
      >
        <div
          className={`${compact ? "p-1.5" : "p-2"} bg-gray-100 dark:bg-gray-700 rounded-full`}
        >
          <Icon
            className={`${compact ? "w-4 h-4" : "w-5 h-5"} text-gray-600 dark:text-gray-300`}
          />
        </div>
        <div>
          <h3
            className={`font-medium text-gray-900 dark:text-white ${compact ? "text-sm" : ""}`}
          >
            {title}
          </h3>
          <p
            className={`text-gray-500 dark:text-gray-400 ${compact ? "text-xs" : "text-sm"}`}
          >
            {description}
          </p>
        </div>
      </div>
      <ChevronRight
        className={`${compact ? "w-4 h-4" : "w-5 h-5"} text-gray-400`}
      />
    </Component>
  );
}
