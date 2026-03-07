import { authService } from "@/services/auth.service";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await authService.logout();
      toast.success("Successfully Signed out");
    } catch (error) {
      console.error("Server error:", error);
    } finally {
      queryClient.clear();
      router.push("/");
      router.refresh();
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
};
