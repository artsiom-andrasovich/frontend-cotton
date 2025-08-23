import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "@/hooks";
import { formatDistanceToNow } from "date-fns";
import { Settings } from "lucide-react";

export function ProfileHeader() {
  const { data, isLoading } = useProfile();

  const calculateMembershipDuration = (createdAt?: string | undefined) => {
    if (!createdAt) return "Member";

    try {
      const createdDate = new Date(createdAt);
      if (isNaN(createdDate.getTime())) return "Member";
      return `Member for ${formatDistanceToNow(createdDate, {
        addSuffix: false,
      })}`;
    } catch {
      return "Member";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-9 w-16" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {data?.name || "User"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {data?.email || "No email"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {calculateMembershipDuration(
              typeof data?.createdAt === "string"
                ? data?.createdAt
                : data?.createdAt?.toISOString?.() // fallback if Date object
            )}
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>
    </div>
  );
}
