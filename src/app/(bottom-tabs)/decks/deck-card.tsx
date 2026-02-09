import { CategoryIcon } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { colorMapDeckCard as colorMap } from "@/constants";
import type { TDeck } from "@/services/types";
import { Play } from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";

const fallback = colorMap.blue;

type DeckCardProps = {
  deck: TDeck;
} & ComponentProps<"div">;

export const DeckCard = ({ deck, ...props }: DeckCardProps) => {
  const color = deck.category.color;
  const colorClasses = colorMap[color as keyof typeof colorMap] || fallback;

  return (
    <div
      {...props}
      className={`
        ${colorClasses.gradient}
        p-4 rounded-lg ${colorClasses.border}
        shadow-sm hover:shadow-md transition-colors mb-4 flex flex-col
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Link href={`/decks/${deck.id}`} className="block">
            <div className="flex items-center space-x-3 mb-2">
              <div
                className={`w-10 h-10 ${colorClasses.iconBg} rounded-lg flex items-center justify-center shadow-sm`}
              >
                <CategoryIcon
                  type={deck.category.icon}
                  className={`w-5 h-5 ${colorClasses.icon}`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors">
                    {deck.name}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-semibold shadow ${colorClasses.badge}`}
                  >
                    {deck.category.name}
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
                  <p
                    className={`text-sm font-medium ${colorClasses.masteryText}`}
                  >
                    {deck.mastery}%
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Mastery
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className={`ml-4 ${colorClasses.buttonBorder}`}
                >
                  <Play className={`w-4 h-4 ${colorClasses.play}`} />
                </Button>
              </div>
            </div>

            {/* Mastery Progress Bar */}
            <div
              className={`w-full ${colorClasses.progressBg} rounded-full h-2 mt-3 mb-1`}
            >
              <div
                className={`${colorClasses.progress} h-2 rounded-full transition-all`}
                style={{ width: `${deck.mastery}%`, minWidth: "1px" }}
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
