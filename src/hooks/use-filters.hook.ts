import { TQueryFilters } from "@/services/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSet } from "react-use";

export type TFilters = {
  categories: Set<string>;
  sortBy: string;
};

type TReturn = {
  setCategories: (value: string) => void;
  selectedCategories: Set<string>;
  sortBy: string;
  setSortBy: (value: string) => void;
  clearCategories: () => void;
};

const FILTERS_STORAGE_KEY = "decks-filters";

function getInitialFilters(searchParams: Map<keyof TQueryFilters, string>): {
  categories: Set<string>;
  sortBy: string;
} {
  // First, check URL params
  const urlCategories = searchParams.get("categories");
  const urlSortBy = searchParams.get("sortBy");

  if (urlCategories || urlSortBy) {
    return {
      categories: new Set<string>(urlCategories?.split(",").filter(Boolean)),
      sortBy: urlSortBy || "recent",
    };
  }

  // If no URL params, try localStorage
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(FILTERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          categories: new Set<string>(parsed.categories || []),
          sortBy: parsed.sortBy || "recent",
        };
      }
    } catch {
      // Ignore parsing errors
    }
  }

  // Default values
  return {
    categories: new Set<string>(),
    sortBy: "recent",
  };
}

export const useFilters = (): TReturn => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof TQueryFilters,
    string
  >;

  const initialFilters = getInitialFilters(searchParams);

  const [
    selectedCategories,
    { toggle: toggleCategories, clear: clearCategories },
  ] = useSet(initialFilters.categories);

  const [sortBy, setSortBy] = useState(initialFilters.sortBy);

  return {
    selectedCategories,
    setCategories: toggleCategories,
    sortBy,
    setSortBy,
    clearCategories,
  };
};

