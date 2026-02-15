import { profileService } from "@/services/profile.service";
import { TUpdateProfileForm } from "@/services/types/profile.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useProfile() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.getProfile("me"),
    select: (data) => data.data,
  });

  const { mutate: uploadAvatar, isPending: isUploadingAvatar } = useMutation({
    mutationFn: (file: File) => profileService.uploadAvatar(file),
    onSuccess: () => {
      toast.success("Avatar uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("Failed to upload avatar");
    },
  });

  const { mutate: deleteAvatar, isPending: isDeletingAvatar } = useMutation({
    mutationFn: () => profileService.deleteAvatar(),
    onSuccess: () => {
      toast.success("Avatar deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("Failed to delete avatar");
    },
  });

  const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
    mutationFn: (data: TUpdateProfileForm) =>
      profileService.updateProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const fullName = `${data?.firstName || ""} ${data?.lastName || ""}`.trim();
  const displayName = fullName || `@${data?.username}`;
  const isUsernameDisplay = !fullName;

  return {
    profile: data,
    displayName,
    isUsernameDisplay,
    isLoading,
    isError,
    uploadAvatar,
    isUploadingAvatar,
    deleteAvatar,
    isDeletingAvatar,
    updateProfile,
    isUpdatingProfile,
  };
}
