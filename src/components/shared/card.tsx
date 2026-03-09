"use client";

import { RichEditor } from "@/app/(dashboard)/decks/[id]/(forms)/rich-editor";
import { AppPaths } from "@/constants";
import { cn } from "@/lib/utils";
import { TCard } from "@/services/types";
import { Check, Eye, Pencil, Trash } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ComponentProps, useCallback, useRef, useState } from "react";

const CardPreviewModal = dynamic(
  () => import("./card-preview").then((m) => ({ default: m.CardPreviewModal })),
  { ssr: false },
);

type CardProps = {
  card: Omit<TCard, "last_review_display"> & { last_review_display?: string };
  deckId: string;
  className?: string;
  isSelecting?: boolean;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
  onLongPress?: (id: string) => void;
  onDelete?: (id: string) => void;
} & Omit<ComponentProps<"div">, "onSelect">;

const LONG_PRESS_DURATION = 500;

export function Card({
  deckId,
  className,
  card,
  isSelecting = false,
  isSelected = false,
  onToggleSelect,
  onLongPress,
  onDelete,
  ...props
}: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPress = useRef(false);

  const cardDifficulty = (difficulty: number) => {
    if (difficulty >= 1 && difficulty <= 4) return "easy";
    if (difficulty > 4 && difficulty <= 7) return "medium";
    if (difficulty > 7 && difficulty <= 10) return "hard";
    return "hard";
  };

  const cardDiff = cardDifficulty(card.fsrsCard.difficulty);

  const startLongPress = useCallback(() => {
    isLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      onLongPress?.(card.id);
    }, LONG_PRESS_DURATION);
  }, [card.id, onLongPress]);

  const cancelLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleClick = useCallback(() => {
    if (isLongPress.current) {
      isLongPress.current = false;
      return;
    }
    if (isSelecting) {
      onToggleSelect?.(card.id);
    }
  }, [isSelecting, card.id, onToggleSelect]);

  return (
    <div
      {...props}
      onMouseDown={!isSelecting ? startLongPress : undefined}
      onMouseUp={cancelLongPress}
      onMouseLeave={cancelLongPress}
      onTouchStart={!isSelecting ? startLongPress : undefined}
      onTouchEnd={cancelLongPress}
      onClick={handleClick}
      className={cn(
        "bg-white dark:bg-gray-800 p-4 rounded-lg border transition-all duration-200 cursor-pointer relative",
        isSelected
          ? "border-primary ring-2 ring-primary/30 bg-primary/5 dark:bg-primary/10"
          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
        isSelecting && "select-none",
        className,
      )}
    >
      {/* Selection checkbox */}
      {isSelecting && (
        <div
          className={cn(
            "absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 z-10",
            isSelected
              ? "bg-primary border-primary text-white scale-110"
              : "border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700",
          )}
        >
          {isSelected && <Check className="w-3.5 h-3.5" />}
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div
            className="h-[100px] overflow-auto card-scroll"
            style={{ scrollbarGutter: "stable" }}
          >
            <RichEditor
              value={card.question ?? ""}
              disabled={true}
              className="w-full h-auto min-h-0 p-0 border-none"
            />
            <hr className="my-2 border-[2px] border-gray-600 dark:border-gray-600" />
            <RichEditor
              value={card.answer ?? ""}
              disabled={true}
              className="w-full h-auto min-h-0 p-0 border-none"
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="space-x-4">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  cardDiff === "easy"
                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                    : cardDiff === "medium"
                      ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                      : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                }`}
              >
                {cardDiff}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {card.last_review_display
                  ? `Last reviewed: ${card.last_review_display}`
                  : "Not reviewed yet"}
              </span>
            </div>
            {!isSelecting && (
              <div className="flex gap-2">
                <Eye
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  className="cursor-pointer w-7 h-7 flex items-center justify-center p-0.5 rounded-sm border border-gray-300 dark:border-gray-600 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                />
                {isModalOpen && (
                  <CardPreviewModal
                    card={card}
                    onClose={() => setIsModalOpen(false)}
                  />
                )}
                <Link
                  href={AppPaths.card.CARD(deckId) + `?cardId=${card.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Pencil className="cursor-pointer w-7 h-7 flex items-center justify-center p-0.5 rounded-sm border border-gray-300 dark:border-gray-600 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150" />
                </Link>
                {onDelete && (
                  <Trash
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(card.id);
                    }}
                    className="cursor-pointer w-7 h-7 flex items-center justify-center p-0.5 rounded-sm border border-gray-300 dark:border-gray-600 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-700 transition-colors duration-150"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
