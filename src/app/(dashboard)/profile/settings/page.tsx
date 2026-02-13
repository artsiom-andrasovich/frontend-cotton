"use client";

import { Navbar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AppPaths } from "@/constants";
import {
	Bell,
	BookOpen,
	Globe,
	HelpCircle,
	Info,
	Shield,
	Sun,
	Volume2,
} from "lucide-react";

export default function SettingsPage() {
  return (
	<>      
	<Navbar title={'Settings'} path={AppPaths.profile.PROFILE} />
	<div className="p-4 space-y-6">
	  {/* Header */}
	  <div>
		<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
		  Settings
		</h1>
		<p className="text-gray-600 dark:text-gray-400">
		  Customize your learning experience
		</p>
	  </div>

	  {/* Notifications */}
	  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
		<div className="flex items-center space-x-3 mb-4">
		  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
		  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
			Notifications
		  </h2>
		</div>

		<div className="space-y-4">
		  <div className="flex items-center justify-between">
			<div>
			  <p className="font-medium text-gray-900 dark:text-white">
				Study Reminders
			  </p>
			  <p className="text-sm text-gray-600 dark:text-gray-400">
				Get notified to study your cards
			  </p>
			</div>
			<Button variant="outline" size="sm">
			  On
			</Button>
		  </div>

		  <div className="flex items-center justify-between">
			<div>
			  <p className="font-medium text-gray-900 dark:text-white">
				Achievement Alerts
			  </p>
			  <p className="text-sm text-gray-600 dark:text-gray-400">
				Celebrate your learning milestones
			  </p>
			</div>
			<Button variant="outline" size="sm">
			  On
			</Button>
		  </div>

		  <div className="flex items-center justify-between">
			<div>
			  <p className="font-medium text-gray-900 dark:text-white">
				Email Updates
			  </p>
			  <p className="text-sm text-gray-600 dark:text-gray-400">
				Receive weekly progress reports
			  </p>
			</div>
			<Button variant="outline" size="sm">
			  Off
			</Button>
		  </div>
		</div>
	  </div>

	  {/* Appearance */}
	  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
		<div className="flex items-center space-x-3 mb-4">
		  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
		  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
			Appearance
		  </h2>
		</div>

		<div className="space-y-4">
		  <div className="flex items-center justify-between">
			<div>
			  <p className="font-medium text-gray-900 dark:text-white">Theme</p>
			  <p className="text-sm text-gray-600 dark:text-gray-400">
				Choose your preferred theme
			  </p>
			</div>
			<ThemeToggle />
		  </div>

		  <div className="flex items-center justify-between">
			<div>
			  <p className="font-medium text-gray-900 dark:text-white">
				Sound Effects
			  </p>
			  <p className="text-sm text-gray-600 dark:text-gray-400">
				Play sounds during study sessions
			  </p>
			</div>
			<Button variant="outline" size="sm">
			  <Volume2 className="w-4 h-4" />
			</Button>
		  </div>
		</div>
	  </div>

	  {/* Study Preferences */}
	  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
		<div className="flex items-center space-x-3 mb-4">
		  <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
		  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
			Study Preferences
		  </h2>
		</div>

		<div className="space-y-4">
		  <div className="flex items-center justify-between">
			<div>
			  <p className="font-medium text-gray-900 dark:text-white">
				Cards per Session
			  </p>
			  <p className="text-sm text-gray-600 dark:text-gray-400">
				Number of cards to study at once
			  </p>
			</div>
			<select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
			  <option>10</option>
			  <option>20</option>
			  <option>30</option>
			  <option>50</option>
			</select>
		  </div>

		  <div className="flex items-center justify-between">
			<div>
			  <p className="font-medium text-gray-900 dark:text-white">
				Auto-advance
			  </p>
			  <p className="text-sm text-gray-600 dark:text-gray-400">
				Automatically show next card
			  </p>
			</div>
			<Button variant="outline" size="sm">
			  Off
			</Button>
		  </div>
		</div>
	  </div>

	  {/* Account & Privacy */}
	  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
		<div className="flex items-center space-x-3 mb-4">
		  <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
		  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
			Account & Privacy
		  </h2>
		</div>

		<div className="space-y-3">
		  <Button variant="outline" className="w-full justify-start">
			<Globe className="w-4 h-4 mr-3" />
			Language & Region
		  </Button>

		  <Button variant="outline" className="w-full justify-start">
			<Shield className="w-4 h-4 mr-3" />
			Privacy Settings
		  </Button>

		  <Button variant="outline" className="w-full justify-start">
			<HelpCircle className="w-4 h-4 mr-3" />
			Help & Support
		  </Button>

		  <Button variant="outline" className="w-full justify-start">
			<Info className="w-4 h-4 mr-3" />
			About Cotton
		  </Button>
		</div>
	  </div>

	  {/* App Version */}
	  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
		<p>Cotton v1.0.0</p>
	  </div>
	</div></>
  );
}
