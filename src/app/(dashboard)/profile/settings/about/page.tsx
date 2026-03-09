"use client";

import { Navbar } from "@/components/shared";
import { APP_NAME, APP_VERSION, AppPaths, SUPPORT_EMAIL } from "@/constants";
import { Code2, Heart, HelpCircle, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import { CreditItem, SettingItem } from "../_components";

export default function AboutSettingsPage() {
  return (
    <>
      <Navbar title={"About"} path={AppPaths.settings.SETTINGS} />
      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* App branding */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
          <Image
            src="/app_logo.png"
            alt={APP_NAME}
            width={64}
            height={64}
            unoptimized
            className="mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {APP_NAME}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Version {APP_VERSION}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed max-w-sm mx-auto">
            Smart flashcard app powered by spaced repetition. Study smarter,
            remember longer.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-2">
          <SettingItem
            icon={HelpCircle}
            title="Help & Support"
            description="FAQ, tips, and how to get help"
            href={AppPaths.settings.HELP}
            compact
          />
          <SettingItem
            icon={Mail}
            title="Contact Us"
            description={SUPPORT_EMAIL}
            href={`mailto:${SUPPORT_EMAIL}`}
            external
            compact
          />
        </div>

        {/* Credits */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
            Credits
          </h3>
          <div className="space-y-3">
            <CreditItem
              icon={Sparkles}
              iconColor="text-yellow-500"
              title="FSRS Algorithm"
              description="Spaced repetition by Open Spaced Repetition"
            />
            <CreditItem
              icon={Code2}
              iconColor="text-green-500"
              title="Open Source"
              description="Built with Next.js, NestJS, Prisma & more"
            />
            <CreditItem
              icon={Heart}
              iconColor="text-red-500"
              title="Made by lateowl"
              description="Crafted with care for learners"
            />
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-500 pb-4">
          © {new Date().getFullYear()} lateowl. All rights reserved.
        </p>
      </div>
    </>
  );
}
