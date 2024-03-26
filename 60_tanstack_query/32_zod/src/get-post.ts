import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string().max(40),
  body: z.string(),
  date: z.string(),
  likes: z.number().optional()
});

type BlogPost = z.infer<typeof BlogPostSchema>;

export function useGetBlogPost(postId: string) {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:7000/posts/${postId}`);
      if (!response.ok) {
        throw new Error("Response was not ok!");
      }
      const result = await response.json(); // result is any!
      const blogPost = BlogPostSchema.parse(result); // blogPost is BlogPost!
      return blogPost;
    }
  });
}
