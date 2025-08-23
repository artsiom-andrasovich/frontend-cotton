import { TCard } from "@/services/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { RichEditor } from "../(forms)/rich-editor";

type FlashCardsSectionProps = {
  showAnswer: boolean;
  card: Partial<TCard>;
};

export function FlashCardsSection({
  showAnswer,
  card,
}: FlashCardsSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
  }, [card]);

  return (
    <div className="flex-1 overflow-hidden flex flex-col items-center justify-center hide-scrollbar mt-2">
      <div className="w-full gap-2 max-w-3xl flex flex-col items-center justify-center py-6 px-4">
        {/* Card - Fixed height container */}
        <div className="dark:bg-gray-800 w-full h-96 flex flex-col overflow-hidden rounded-2xl">
          {showAnswer && (
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="w-full flex justify-between items-center p-4 bg-gray-700 transition-colors font-medium text-left flex-shrink-0"
            >
              <span>Show/Hide Question</span>
              {isOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          )}

          {/* Scrollable content area */}
          <div className="flex-1 overflow-auto p-4">
            <div
              className={`w-full flex flex-col ${
                (isOpen && showAnswer) || (!isOpen && showAnswer)
                  ? "h-fit"
                  : " h-fit "
              } `}
            >
              <RichEditor
                value={card.question}
                disabled={true}
                className={`w-full h-fit border-none ${
                  !showAnswer || isOpen ? "" : "hidden"
                }`}
              />
            </div>

            {showAnswer && (
              <>
                {isOpen && (
                  <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600 w-full" />
                )}
                <div className="w-full">
                  <RichEditor
                    value={card.answer}
                    disabled={true}
                    className="h-fit pb-0 border-none bg-transparent"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
