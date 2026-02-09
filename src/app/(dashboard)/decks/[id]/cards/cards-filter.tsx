import { AnimatedSearchInput } from "@/components/shared";
import { Button } from "@/components/ui";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { POSSIBLE_SORT_BY_CARD } from "@/constants";
import { useCardsQueryFilters } from "@/hooks";
import { useCardsFilters } from "@/hooks/use-cards-filters.hook";
import { ChevronDown, SortAsc } from "lucide-react";
import { useEffect, useState } from "react";

export function CardsFilter({
  onSearchFocusChange,
}: {
  onSearchFocusChange?: (isFocused: boolean) => void;
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);
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
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex  items-center gap-2">
              <SortAsc className="w-4 h-4" />
              <ChevronDown className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-40 p-2">
            {POSSIBLE_SORT_BY_CARD.map((option) => (
              <button
                key={option.value}
                className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  sortBy === option.value
                    ? "bg-primary/10 dark:bg-primary/20 text-primary"
                    : ""
                }`}
                onClick={() => {
                  setSortBy(option.value);
                  setPopoverOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
