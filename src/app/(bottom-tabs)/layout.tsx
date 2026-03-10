"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { APP_NAME, AppPaths } from "@/constants";
import { Atom, BookOpen, Home, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  {
    name: "Home",
    href: AppPaths.HOME,
    icon: Home,
  },
  {
    name: "Decks",
    href: AppPaths.deck.DECKS,
    icon: BookOpen,
  },
  {
    name: "Explore",
    href: AppPaths.explore.EXPLORE,
    icon: Atom,
  },
  {
    name: "Profile",
    href: AppPaths.profile.PROFILE,
    icon: User,
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="h-[100dvh] flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 pb-3 pt-[max(env(safe-area-inset-top),0.75rem)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              alt="logo"
              width={30}
              height={30}
              src={"/app_logo.png"}
              unoptimized
            />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {APP_NAME}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto hide-scrollbar">
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(0,0,0,0))] pointer-events-none" />
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 pt-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-primary bg-primary/10 dark:bg-primary/20"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
