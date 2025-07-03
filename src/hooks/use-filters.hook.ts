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

export const useFilters = (): TReturn => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof TQueryFilters,
    string
  >;

  const [
    selectedCategories,
    { toggle: toggleCategories, clear: clearCategories },
  ] = useSet(new Set<string>(searchParams.get("categories")?.split(",")));

  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "recent");
  console.log(sortBy);

  return {
    selectedCategories,
    setCategories: toggleCategories,
    sortBy,
    setSortBy,
    clearCategories,
  };
};
