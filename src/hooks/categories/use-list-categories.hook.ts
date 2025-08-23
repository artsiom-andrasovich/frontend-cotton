import { categoriesService } from "@/services/categories.service";
import { useQuery } from "@tanstack/react-query";
export function useListCategories() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesService.listUserCategories(),
  });
  console.log(isError);

  return { ...data, isLoading, isError };
}
