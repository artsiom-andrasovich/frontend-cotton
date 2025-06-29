"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, MoreVertical, Play, Plus } from "lucide-react";
import Link from "next/link";

export default function DecksPage() {
  const sampleDecks = [
    {
      id: 1,
      title: "JavaScript Basics",
      description: "Core concepts and fundamentals",
      cardCount: 45,
      lastStudied: "2 hours ago",
      mastery: 85,
    },
    {
      id: 2,
      title: "React Hooks",
      description: "Understanding React hooks",
      cardCount: 32,
      lastStudied: "1 day ago",
      mastery: 92,
    },
    {
      id: 3,
      title: "TypeScript Fundamentals",
      description: "Type safety and interfaces",
      cardCount: 28,
      lastStudied: "3 days ago",
      mastery: 78,
    },
    {
      id: 4,
      title: "CSS Grid & Flexbox",
      description: "Modern CSS layout techniques",
      cardCount: 38,
      lastStudied: "1 week ago",
      mastery: 65,
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Decks
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your flashcard collections
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Deck
        </Button>
      </div>

      {/* Decks Grid */}
      <div className="grid gap-4">
        {sampleDecks.map((deck) => (
          <div
            key={deck.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Link href={`/decks/${deck.id}`} className="block">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors">
                        {deck.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {deck.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{deck.cardCount} cards</span>
                      <span>•</span>
                      <span>Last studied {deck.lastStudied}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {deck.mastery}%
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Mastery
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Action buttons - outside the link to prevent conflicts */}
                <div className="flex items-center justify-end mt-3 space-x-2">
                  <Button size="sm" variant="outline">
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (hidden when decks exist) */}
      {sampleDecks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No decks yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first deck to start learning
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Deck
          </Button>
        </div>
      )}
    </div>
  );
}
