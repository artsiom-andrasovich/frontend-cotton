import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
export function useProfile() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userService.getMyProfile(),
  });
  console.log(isError);

  return { ...data, isLoading, isError };
}
