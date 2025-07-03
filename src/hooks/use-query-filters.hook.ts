import { useRouter } from "next/navigation";
import qs from "qs";
import { useEffect } from "react";
import { TFilters } from "./use-filters.hook";

export function useQueryFilters({ categories, sortBy }: TFilters) {
  const router = useRouter();

  useEffect(() => {
    const params = {
      categories: Array.from(categories),
      sortBy: sortBy,
    };
    const query = qs.stringify(params, {
      arrayFormat: "comma",
    });

    router.push(`?${query}`, { scroll: false });
  }, [categories, router, sortBy]);
}
