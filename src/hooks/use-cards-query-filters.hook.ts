import { useRouter } from "next/navigation";
import qs from "qs";
import { useDebounce } from "react-use";

type params = {
  sortBy: string;
  search?: string;
};

export const useCardsQueryFilters = ({ sortBy, search }: params) => {
  const router = useRouter();

  useDebounce(
    () => {
      const params = {
        sortBy: sortBy,
        search,
      };
      const query = qs.stringify(params, {
        arrayFormat: "comma",
      });
      console.log(sortBy);

      router.push(`?${query}`, { scroll: false });
    },
    300,
    [sortBy, search, router]
  );
};
