import { BlogPost, NewBlogPost } from "./types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function savePost(post: NewBlogPost): Promise<BlogPost> {
  const response = await fetch("http://localhost:7000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}

export function useSaveBlogPostMutation() {
  const queryClient = useQueryClient();
  const saveMutation = useMutation({
    mutationKey: ["new-post"],
    mutationFn: savePost,
    onSuccess: () => queryClient.removeQueries({ queryKey: ["posts"] }),
  });

  return saveMutation;
}
