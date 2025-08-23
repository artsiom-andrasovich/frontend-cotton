import { useSearchParams } from "next/navigation";
import { useState } from "react";

type TCardQueryFilters = {
  search: string;
  sortBy: string;
};
export const useCardsFilters = () => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof TCardQueryFilters,
    string
  >;
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "newest");
  const [search, setSearch] = useState(searchParams.get("search") || "");

  return {
    sortBy,
    setSortBy,
    search,
    setSearch,
  };
};
