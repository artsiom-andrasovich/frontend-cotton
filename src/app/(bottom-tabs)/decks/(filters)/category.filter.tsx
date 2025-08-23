import { ChevronDown, Filter, X } from "lucide-react";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { DropDownCategories } from "./drop-down-categories";

export type TCategoryProps = {
  select: (val: string) => void;
  categories?: string[];
  selectedCategories: Set<string>;
  clearCategories: () => void;
  isLoadingCategories: boolean;
};

export function CategoryFilter({
  categories,
  select,
  selectedCategories,
  clearCategories,
  isLoadingCategories,
}: TCategoryProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  useClickAway(categoryDropdownRef, () => {
    setTimeout(() => {
      setIsCategoryOpen(false);
    }, 100);
  });
  selectedCategories = new Set(
    categories?.filter((val) => Array.from(selectedCategories).includes(val))
  );
  if (!categories || categories.length == 0) selectedCategories = new Set();

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Filter className="w-4 h-4" />
          <span>Categories:</span>
        </div>
        <button
          onClick={() => setIsCategoryOpen((prev) => !prev)}
          className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {Array.from(selectedCategories).length === 0
              ? "All Categories"
              : `${Array.from(selectedCategories).length} selected`}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isCategoryOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Dropdown Content */}
      {isCategoryOpen && !isLoadingCategories && (
        <DropDownCategories
          ref={categoryDropdownRef}
          categories={categories}
          clearCategories={clearCategories}
          select={select}
          selectedCategories={selectedCategories}
        />
      )}

      {/* Selected Categories Display */}
      {selectedCategories.size > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {Array.from(selectedCategories).map((category) => (
            <div
              key={category}
              className="flex items-center space-x-1 px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm"
            >
              <span>{category}</span>
              <button
                onClick={() => {
                  select(category);
                }}
                className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

//dropdown comp here
