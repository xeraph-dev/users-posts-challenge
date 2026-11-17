import type { User } from "@/schemas/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUser = (id: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["users", id],
    initialData: () => {
      const users = queryClient.getQueryData<User[]>(["users"]);
      return users?.find((user) => user.id === id);
    },
    staleTime: 1000 * 60 * 5,
  });
};
