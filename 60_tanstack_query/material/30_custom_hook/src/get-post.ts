import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "./types";

export function useGetBlogPost(postId: string) {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:7000/posts/${postId}?slow`);
      if (!response.ok) {
        throw new Error("Response was not ok!");
      }
      return response.json() as Promise<BlogPost>;
    }
  });
}
