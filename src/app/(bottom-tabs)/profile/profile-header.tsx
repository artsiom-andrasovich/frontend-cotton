import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AppPaths } from "@/constants";
import { useProfile } from "@/hooks/use-profile.hook";
import { formatDistanceToNow } from "date-fns";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
//TODO: logic of return to the profile if pencil was clicked
export function ProfileHeader() {
  const { profile, displayName, isUsernameDisplay, isLoading } = useProfile();

  console.log("Profile Data:", profile);

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
          <Skeleton className="w-16 h-16 rounded-full" />
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
        {/* Avatar Section */}
        <div className="w-16 h-16 overflow-hidden rounded-full ring-2 ring-border">
          {profile?.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              alt="Avatar"
              width={64}
              height={64}
              unoptimized
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-secondary text-secondary-foreground">
              <span className="text-2xl text-muted-foreground">?</span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1
            className={`font-bold text-gray-900 dark:text-white ${
              isUsernameDisplay ? "text-2xl" : "text-xl"
            }`}
          >
            {displayName || "User"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {calculateMembershipDuration(profile?.createdAt)}
          </p>
        </div>
        <Link href={AppPaths.settings.PROFILE}>
          <Button variant="ghost" size="icon" className="border border-input">
            <Pencil className="w-5 h-5 text-gray-500" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
