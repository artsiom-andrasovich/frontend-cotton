import { POSSIBLE_SORT_BY_DECK } from "@/constants";
import { SortAsc } from "lucide-react";
import { useEffect } from "react";

type TSortFilterProps = {
  setSortBy: (val: string) => void;
  sortBy: string;
};

export function SortFilter({ setSortBy, sortBy }: TSortFilterProps) {
  useEffect(() => {
    if (!POSSIBLE_SORT_BY_DECK.map((item) => item.value).includes(sortBy)) {
      setSortBy(POSSIBLE_SORT_BY_DECK[0].value);
    }
  }, [sortBy, setSortBy]);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <SortAsc className="w-4 h-4" />
        <span>Sort by:</span>
      </div>
      <div className="flex items-center space-x-2 overflow-x-auto hide-scrollbar pb-2">
        {[
          { value: "recent", label: "Recently Studied" },
          { value: "mastery", label: "Mastery" },
          { value: "cards", label: "Card Count" },
          { value: "alphabetical", label: "A-Z" },
          { value: "newest", label: "Newest" },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => setSortBy(option.value)}
            className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors backdrop-blur-sm border ${
              sortBy === option.value
                ? "text-primary bg-primary/10 dark:bg-primary/20 border-primary/20 dark:border-primary/30 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-700/80 border-gray-200/50 dark:border-gray-600/50"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
