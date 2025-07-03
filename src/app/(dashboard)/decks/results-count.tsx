import { Skeleton } from "@/components/ui/skeleton";
import { useGetDecks } from "@/hooks";

export function ResultsCounts() {
  const { data, isLoading } = useGetDecks();
  if (isLoading) {
    return <Skeleton className="h-5 w-32" />;
  }
  return (
    <div className="text-sm text-gray-600 dark:text-gray-400">
      {data?.pages[0].totalCount} deck
      {data?.pages[0].totalCount !== 1 ? "s" : ""} found
    </div>
  );
}
