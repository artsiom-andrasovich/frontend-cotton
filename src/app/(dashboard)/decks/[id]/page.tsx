"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Play,
  Plus,
  Settings,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DeckDetailPage() {
  const params = useParams();
  const deckId = params.id as string;

  // Mock deck data - in real app this would come from API
  const deck = {
    id: deckId,
    title: "JavaScript Basics",
    description: "Core concepts and fundamentals of JavaScript programming",
    cardCount: 45,
    lastStudied: "2 hours ago",
    mastery: 85,
    createdAt: "January 15, 2024",
    category: "Programming",
  };

  const sampleCards = [
    {
      id: 1,
      front: "What is a variable in JavaScript?",
      back: "A variable is a container for storing data values. It can hold different types of data like numbers, strings, objects, etc.",
      difficulty: "easy",
      lastReviewed: "2 hours ago",
    },
    {
      id: 2,
      front: "What is the difference between let, const, and var?",
      back: "let: block-scoped, can be reassigned; const: block-scoped, cannot be reassigned; var: function-scoped, can be reassigned",
      difficulty: "medium",
      lastReviewed: "1 day ago",
    },
    {
      id: 3,
      front: "What is a function in JavaScript?",
      back: "A function is a reusable block of code that performs a specific task. It can take parameters and return values.",
      difficulty: "easy",
      lastReviewed: "3 days ago",
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/decks">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {deck.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {deck.description}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Deck Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {deck.cardCount}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Cards</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {deck.mastery}%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Mastery</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Last studied
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {deck.lastStudied}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="h-16 flex flex-col items-center justify-center space-y-1 bg-primary hover:bg-primary/90">
          <Play className="w-5 h-5" />
          <span className="text-sm">Study Now</span>
        </Button>

        <Button
          variant="outline"
          className="h-16 flex flex-col items-center justify-center space-y-1"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm">Add Cards</span>
        </Button>
      </div>

      {/* Cards List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Cards
          </h2>
          <Link href={`/decks/${deckId}/cards`}>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
          {sampleCards.map((card) => (
            <div
              key={card.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {card.front}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {card.back}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        card.difficulty === "easy"
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : card.difficulty === "medium"
                          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                          : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                      }`}
                    >
                      {card.difficulty}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Last reviewed: {card.lastReviewed}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deck Info */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Deck Information
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Category:</span>
            <span className="text-gray-900 dark:text-white">
              {deck.category}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Created:</span>
            <span className="text-gray-900 dark:text-white">
              {deck.createdAt}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Last studied:
            </span>
            <span className="text-gray-900 dark:text-white">
              {deck.lastStudied}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
