import { RichEditor } from "@/app/(dashboard)/decks/[id]/(forms)/rich-editor";
import { AppPaths } from "@/constants";
import { cn } from "@/lib/utils";
import { TCard } from "@/services/types";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import { ComponentProps, useState } from "react";
import { CardPreviewModal } from "./card-preview";
//TODO: lazy modal
type CardProps = {
  card: Omit<TCard, "last_review_display"> & { last_review_display?: string };
  deckId: string;
  className?: string;
} & ComponentProps<"div">;
export function Card({ deckId, className, card, ...props }: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardDifficulty = (difficulty: number) => {
    if (difficulty >= 1 && difficulty <= 4) return "easy";

    if (difficulty > 4 && difficulty <= 7) return "medium";
    if (difficulty > 7 && difficulty <= 10) return "hard";
    return "hard";
  };
  console.log("card");
  console.log(card);
  console.log("okk");

  const cardDiff = cardDifficulty(card.fsrsCard.difficulty);

  return (
    <div
      {...props}
      className={cn(
        "bg-white  dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-pointer",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div
            className="h-[100px] overflow-auto card-scroll"
            style={{ scrollbarGutter: "stable" }}
          >
            <RichEditor
              value={card.question ?? ""}
              disabled={true}
              className="w-full h-auto min-h-0  p-0 border-none"
            />
            <hr className="my-2 border-[2px] border-gray-600 dark:border-gray-600" />
            <RichEditor
              value={card.answer ?? ""}
              disabled={true}
              className="w-full h-auto min-h-0 p-0 border-none"
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className=" space-x-4">
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
                  : 'Not reviewed yet'}
              </span>
            </div>
            <div className="flex gap-2 ">
              <Eye
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer w-7 h-7 flex items-center justify-center p-0.5 rounded-sm border border-gray-300 dark:border-gray-600 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
              />
              {isModalOpen && (
                <CardPreviewModal
                  card={card}
                  onClose={() => setIsModalOpen(false)}
                />
              )}
              <Link href={AppPaths.card.CARD(deckId) + `?cardId=${card.id}`}>
                <Pencil className="cursor-pointer w-7 h-7 flex items-center justify-center p-0.5 rounded-sm border border-gray-300 dark:border-gray-600 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
