"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppPaths } from "@/constants";
import { useProfile } from "@/hooks/use-profile.hook";
import { saveTokenStorage } from "@/services/auth-token.service";
import { userService } from "@/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ProfileFormValues, profileFormSchema } from "./profile-form.schema";

export function ProfileForm() {
  const { profile, updateProfile, isUpdatingProfile } = useProfile();
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
    },
    values: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      username: profile?.username || "",
      email: profile?.email || "",
    },
  });

  const { mutate: updateUserData, isPending: isUpdatingUserData } = useMutation(
    {
      mutationFn: userService.changeUserData,
      onSuccess: (response) => {
        const { accessToken } = response.data;
        if (accessToken) {
          saveTokenStorage(accessToken);
        }
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        toast.success("User data updated");
        router.push(AppPaths.profile.PROFILE);
      },
      onError: (error: any) => {
        const message =
          error.response?.data?.message || "Failed to update user data";
        if (message === "Username already taken") {
          form.setError("username", { type: "manual", message });
          toast.error("Username already taken");
        } else if (message === "Email already taken") {
          form.setError("email", { type: "manual", message });
          toast.error("Email already taken");
        } else {
          toast.error(message);
        }
      },
    },
  );

  const onSubmit = async (data: ProfileFormValues) => {
    // 1. Update Profile (First/Last Name)
    if (
      data.firstName !== profile?.firstName ||
      data.lastName !== profile?.lastName
    ) {
      updateProfile({
        firstName: data.firstName,
        lastName: data.lastName,
      });
    }

    // 2. Update User Data (Username/Email)
    if (data.username !== profile?.username || data.email !== profile?.email) {
      updateUserData({ username: data.username, email: data.email });
      // Navigation happens in onSuccess — stays on page if error
    } else {
      // Only profile fields changed, navigate immediately
      router.push(AppPaths.profile.PROFILE);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isUpdatingProfile || isUpdatingUserData}
          >
            {isUpdatingProfile || isUpdatingUserData
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
