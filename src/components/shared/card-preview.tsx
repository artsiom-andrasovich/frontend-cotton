import { RichEditor } from "@/app/(dashboard)/decks/[id]/(forms)/rich-editor";
import { X } from "lucide-react";
import { useRef } from "react";
import { useClickAway } from "react-use";

export function CardPreviewModal({
  card,
  onClose,
}: {
  card: { question: string; answer: string };
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickAway(modalRef, () => {
    setTimeout(() => {
      onClose();
    }, 150);
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-lg p-4 max-h-[90dvh] flex flex-col overflow-hidden"
      >
        <div className="flex justify-end pb-2">
          <button onClick={() => onClose()}>
            <X
              strokeWidth={3}
              size={24}
              className="hover:cursor-pointer text-red-500 border-[2px] rounded-full"
            />
          </button>
        </div>
        <div
          className="overflow-auto"
          style={{ maxHeight: "calc(90dvh - 2rem)" }}
        >
          <RichEditor
            value={card.question}
            disabled
            className="w-full h-auto min-h-0 p-0 border-none"
          />
          <hr className="my-2 border-[2px] border-gray-600 dark:border-gray-600" />
          <RichEditor
            value={card.answer}
            disabled
            className="w-full h-auto min-h-0 p-0 border-none"
          />
        </div>
      </div>
    </div>
  );
}
