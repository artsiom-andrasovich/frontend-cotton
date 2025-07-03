import { Button } from "@/components/ui/button";
import type { TDeck } from "@/services/types";
import { BookOpen, Play } from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";

type DeckCardProps = {
  deck: TDeck;
} & ComponentProps<"div">;

//TODO: colors in categories

export const DeckCard = ({ deck, ...props }: DeckCardProps) => {
  return (
    <div
      {...props}
      className="bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-700 shadow-sm hover:shadow-md transition-colors mb-4 flex flex-col"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/*TODO: */}
          <Link href={`/decks/${deck.id}`} className="block">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors">
                    {deck.name}
                  </h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 font-semibold shadow">
                    {deck.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {deck.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{deck.cardCount} cards</span>
                <span>•</span>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Last studied
                  </span>
                  <span>{deck.lastStudied}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    {deck.mastery}%
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Mastery
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-4 border-blue-300 dark:border-blue-600"
                >
                  <Play className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </Button>
              </div>
            </div>

            {/* Mastery Progress Bar */}
            <div className="w-full bg-blue-100 dark:bg-blue-800 rounded-full h-2 mt-3 mb-1">
              <div
                className="bg-blue-500 dark:bg-blue-400 h-2 rounded-full transition-all"
                style={{ width: `${deck.mastery}%`, minWidth: "1px" }}
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
