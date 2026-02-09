import { useRouter } from "next/navigation";
import qs from "qs";
import { useDebounce } from "react-use";
import { TFilters } from "./use-filters.hook";

const FILTERS_STORAGE_KEY = "decks-filters";

export function useQueryFilters({ categories, sortBy }: TFilters) {
  const router = useRouter();

  useDebounce(
    () => {
      const params = {
        categories: Array.from(categories),
        sortBy: sortBy,
      };

      // Save to localStorage for persistence across navigation
      if (typeof window !== "undefined") {
        localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(params));
      }

      const query = qs.stringify(params, {
        arrayFormat: "comma",
      });

      router.push(`?${query}`, { scroll: false });
    },
    300, // ms
    [categories, sortBy, router]
  );
}

