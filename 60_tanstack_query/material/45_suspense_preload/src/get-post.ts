import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";

const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  date: z.string(),
  likes: z.number().optional()
});

type BlogPost = z.infer<typeof BlogPostSchema>;

export function useGetBlogPost(postId: string) {
  return useSuspenseQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:7000/posts/${postId}?slow`);
      if (!response.ok) {
        throw new Error("Response was not ok!");
      }
      const result = await response.json(); // result is any!
      const blogPost = BlogPostSchema.parse(result); // blogPost is BlogPost!
      return blogPost;
    }
  });
}
