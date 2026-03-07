import { CategoryIcon } from "@/components/shared";
import { AppPaths, colorMapDeckCard as colorMap } from "@/constants";
import type { TDeck } from "@/services/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
const fallback = colorMap.blue;

type DeckCardProps = {
  deck: TDeck;
} & ComponentProps<"div">;

export const DeckCard = ({ deck, ...props }: DeckCardProps) => {
  const color = deck.category.color;
  const colorClasses = colorMap[color as keyof typeof colorMap] || fallback;
  const router = useRouter();
  return (
    <div
      {...props}
      className={`
        ${colorClasses.gradient}
        p-4 rounded-lg ${colorClasses.border}
        shadow-sm hover:shadow-md transition-colors mb-4 flex flex-col h-[150px] relative overflow-hidden
      `}
    >
      {/* Category Pill - Absolute Top Right */}
      <span
        className={`absolute top-4 right-4 px-2 py-1 text-[10px] sm:text-xs rounded-full font-semibold shadow whitespace-nowrap z-10 ${colorClasses.badge}`}
      >
        {deck.category.name}
      </span>

      <div className="flex flex-col h-full w-full">
        <div className="flex-1 min-w-0">
          <Link
            href={AppPaths.deck.GET_DECK(deck.id)}
            className="flex flex-col h-full w-full outline-none"
          >
            <div className="flex items-start space-x-3 mb-2 min-w-0">
              <div
                className={`w-10 h-10 shrink-0 ${colorClasses.iconBg} rounded-lg flex items-center justify-center shadow-sm`}
              >
                <CategoryIcon
                  type={deck.category.icon}
                  className={`w-5 h-5 ${colorClasses.icon}`}
                />
              </div>
              <div className="flex-1 min-w-0 pr-16 relative">
                <div className="flex items-center space-x-2 w-full">
                  <h3 className="font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors truncate">
                    {deck.name}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 break-words">
                  {deck.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
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
                {/* <Button
                  size="sm"
                  variant="outline"
                  className={`ml-4 ${colorClasses.buttonBorder} z-50`}
                  onClick={() => router.push(AppPaths.game.GAME(deck.id))}
                >
                  <Play className={`w-4 h-4 ${colorClasses.play}`} />
                </Button> */}
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
