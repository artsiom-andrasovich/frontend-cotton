import { useRouter } from "next/navigation";
import qs from "qs";
import { useDebounce } from "react-use";
import { TFilters } from "./use-filters.hook";

export function useQueryFilters({ categories, sortBy }: TFilters) {
  const router = useRouter();

  useDebounce(
    () => {
      const params = {
        categories: Array.from(categories),
        sortBy: sortBy,
      };
      const query = qs.stringify(params, {
        arrayFormat: "comma",
      });

      router.push(`?${query}`, { scroll: false });
    },
    300, // ms
    [categories, sortBy, router]
  );
}
