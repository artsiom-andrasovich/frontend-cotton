"use client";

import { useFilters, useQueryFilters } from "@/hooks";
import { useListCategories } from "@/hooks/use-list-categories.hook";
import { CategoryFilter, SortFilter } from "./(filters)";
export function DecksFilter() {
  const { data: categories, isLoading } = useListCategories();

  // const categories = [
  //   "programming",
  //   "design",
  //   "language",
  //   "education",
  //   "sadasdadsaads",
  //   "saaaaaaaa",
  //   "glglglglglglglggllg",
  //   "gsdgsfgsdfgs",
  //   "sssssssss",
  // ];
  const {
    selectedCategories,
    setCategories,
    setSortBy,
    sortBy,
    clearCategories,
  } = useFilters();

  useQueryFilters({ categories: selectedCategories, sortBy });

  return (
    <div className="space-y-4">
      {/* Category Filter Dropdown */}
      <CategoryFilter
        isLoadingCategories={isLoading}
        clearCategories={clearCategories}
        selectedCategories={selectedCategories}
        select={setCategories}
        categories={categories}
      />

      {/* Sort Options */}
      <SortFilter sortBy={sortBy} setSortBy={setSortBy} />
    </div>
  );
}
