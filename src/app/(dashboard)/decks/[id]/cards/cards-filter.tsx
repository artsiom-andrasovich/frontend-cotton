"use client";

import { AnimatedSearchInput } from "@/components/shared";
import { Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { POSSIBLE_SORT_BY_CARD } from "@/constants";
import { useCardsQueryFilters } from "@/hooks";
import { useCardsFilters } from "@/hooks/use-cards-filters.hook";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, SortAsc } from "lucide-react";
import { useEffect } from "react";

export function CardsFilter({
  onSearchFocusChange,
}: {
  onSearchFocusChange?: (isFocused: boolean) => void;
}) {
  const { setSortBy, sortBy, search, setSearch } = useCardsFilters();
  useCardsQueryFilters({ sortBy, search });

  useEffect(() => {
    if (
      !POSSIBLE_SORT_BY_CARD.map((item) => item.value).includes(sortBy as any)
    ) {
      setSortBy(POSSIBLE_SORT_BY_CARD[0].value);
    }
  }, [sortBy, setSortBy]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex gap-2 w-full sm:w-auto">
        <AnimatedSearchInput
          search={search}
          setSearch={setSearch}
          onFocusChange={onSearchFocusChange}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <SortAsc className="w-4 h-4" />
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="
              w-auto min-w-[10rem]
              bg-white dark:bg-gray-800 
              border-gray-200 dark:border-gray-700
              [&>*:not(:last-child)]:border-b 
              [&>*:not(:last-child)]:border-gray-100 
              dark:[&>*:not(:last-child)]:border-gray-700
            "
          >
            {POSSIBLE_SORT_BY_CARD.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={cn(
                  "cursor-pointer flex items-center justify-between gap-3",
                  "focus:bg-gray-100 dark:focus:bg-gray-700",
                  sortBy === option.value
                    ? "text-primary dark:text-primary"
                    : "text-gray-700 dark:text-gray-200",
                )}
              >
                <span>{option.label}</span>
                {sortBy === option.value && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
