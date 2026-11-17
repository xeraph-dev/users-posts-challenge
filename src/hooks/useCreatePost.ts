import type { PostCreate } from "@/schemas/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePost = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["users", userId, "posts"],
    mutationFn: async (newPost: PostCreate) => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        },
      );

      if (!res.ok) throw new Error("Failed to create post");
      return res.json();
    },
    onMutate: async (newPost: PostCreate) => {
      await queryClient.cancelQueries({ queryKey: ["users", userId, "posts"] });

      const previousPosts = queryClient.getQueryData<PostCreate[]>([
        "users",
        userId,
        "posts",
      ]);

      const optimisticPost = {
        ...newPost,
        id: Date.now(),
      };

      queryClient.setQueryData(
        ["users", userId, "posts"],
        (old: PostCreate[] = []) => [optimisticPost, ...old],
      );

      return { previousPosts };
    },
    onError: (_err, _newPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(
          ["users", userId, "posts"],
          context.previousPosts,
        );
      }
    },
  });
};
