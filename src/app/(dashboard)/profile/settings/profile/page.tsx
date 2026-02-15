"use client";

import { Navbar } from "@/components/shared";
import { AppPaths } from "@/constants";
import { useProfile } from "@/hooks/use-profile.hook";
import { AvatarUpload } from "./avatar-upload";
import { ProfileForm } from "./profile-form";

export default function ProfileSettingsPage() {
  const {
    profile,
    uploadAvatar,
    isUploadingAvatar,
    deleteAvatar,
    isDeletingAvatar,
  } = useProfile();

  const handleUpload = (file: File) => {
    uploadAvatar(file);
  };

  return (
    <>
      <Navbar title={"Profile Settings"} path={AppPaths.settings.SETTINGS} />
      <div className="p-4 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="space-y-8">
            {/* Avatar Section */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Avatar
              </h2>
              <AvatarUpload
                avatarUrl={profile?.avatarUrl}
                isUploading={isUploadingAvatar}
                isDeleting={isDeletingAvatar}
                onUpload={handleUpload}
                onDelete={deleteAvatar}
              />
            </section>

            <div className="border-t border-gray-200 dark:border-gray-700" />

            {/* Profile Form Section */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Personal Information
              </h2>
              <ProfileForm />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
