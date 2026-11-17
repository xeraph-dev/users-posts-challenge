import type { Post } from "@/schemas/post";
import { useQuery } from "@tanstack/react-query";

export const useGetPostsByUserID = (userId: number) => {
  return useQuery<Post[]>({
    queryKey: ["users", userId, "posts"],
  });
};
