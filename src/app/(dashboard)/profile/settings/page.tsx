"use client";

import { Navbar } from "@/components/shared";
import { APP_NAME, APP_VERSION, AppPaths } from "@/constants";
import {
  ChevronRight,
  HelpCircle,
  LucideIcon,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";

interface SettingsItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const SettingsItem = ({
  icon: Icon,
  title,
  description,
  href,
}: SettingsItemProps) => (
  <Link
    href={href}
    className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
  >
    <div className="flex items-center space-x-4">
      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </div>
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-400" />
  </Link>
);

export default function SettingsPage() {
  return (
    <>
      <Navbar title={"Settings"} path={AppPaths.profile.PROFILE} />
      <div className="p-4 space-y-6 mt-4">
        <div className="space-y-3">
          <SettingsItem
            icon={User}
            title="Profile"
            description="Update your photo and personal details"
            href={AppPaths.settings.PROFILE}
          />
          {/* <SettingsItem
            icon={Smartphone}
            title="App"
            description="Customize appearance and study preferences"
            href={AppPaths.settings.APP}
          /> */}
          <SettingsItem
            icon={Shield}
            title="Security"
            description="Manage your account security and privacy"
            href={AppPaths.settings.SECURITY}
          />
          {/* <SettingsItem
            icon={Bell}
            title="Notifications"
            description="Control your notification preferences"
            href={AppPaths.settings.NOTIFICATIONS}
          /> */}
          <SettingsItem
            icon={HelpCircle}
            title="About"
            description="Information about late-owl and support"
            href={AppPaths.settings.ABOUT}
          />
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4">
          <p>
            {APP_NAME} v{APP_VERSION}
          </p>
        </div>
      </div>
    </>
  );
}
