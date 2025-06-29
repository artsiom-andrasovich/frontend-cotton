"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Plus, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function DashboardHome() {
  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Ready to continue learning?
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Total Decks
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            12
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Study Time
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            2.5h
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h3>

        <div className="space-y-3">
          <Link href="/decks/1">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white hover:text-primary transition-colors">
                      JavaScript Basics
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Last studied 2 hours ago
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    85%
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Mastery
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    React Hooks
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Completed 5 cards
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  92%
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Mastery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Quick Actions
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <Button className="h-16 flex flex-col items-center justify-center space-y-1 bg-primary hover:bg-primary/90">
            <Plus className="w-5 h-5" />
            <span className="text-sm">Create Deck</span>
          </Button>

          <Button
            variant="outline"
            className="h-16 flex flex-col items-center justify-center space-y-1"
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-sm">Study Now</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
