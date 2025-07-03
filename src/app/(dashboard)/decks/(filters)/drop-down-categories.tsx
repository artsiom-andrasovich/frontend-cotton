import { FilterCheckbox } from "@/components/shared";
import { ComponentProps } from "react";
import { type TCategoryProps } from "./category.filter";

export const DropDownCategories = ({
  categories,
  clearCategories,
  select,
  selectedCategories,
  ref,
}: Omit<TCategoryProps, "isLoadingCategories"> & ComponentProps<"div">) => {
  //TODO: no categories if no desc like
  return (
    <div
      ref={ref}
      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
    >
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Select Categories
          </span>
          {selectedCategories.size > 0 && (
            <button
              onClick={clearCategories}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="max-h-48 overflow-y-auto">
        {categories?.map((category) => (
          <FilterCheckbox
            text={category}
            value={category}
            checked={selectedCategories.has(category)}
            key={`deck-category-${category}`}
            name={category}
            onCheckedChange={() => select?.(category)}
          />
        ))}
      </div>
    </div>
  );
};
