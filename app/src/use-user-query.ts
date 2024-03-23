import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  login: z.string()
});

export function usePreloadUser(postId: string) {
  const queryClient = useQueryClient();
  return queryClient.ensureQueryData({
    queryKey: ["posts", postId, "user"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:7000/posts/${postId}/user?slow=2400`);
      if (!response.ok) {
        throw new Error("Response was not ok!");
      }
      const result = await response.json(); // result is any!
      const user = UserSchema.parse(result); // blogPost is BlogPost!
      return user;
    }
  });
}

export function useGetUser(postId: string) {
  return useSuspenseQuery({
    queryKey: ["posts", postId, "user"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:7000/posts/${postId}/user?slow=2400`);
      if (!response.ok) {
        throw new Error("Response was not ok!");
      }
      const result = await response.json(); // result is any!
      const user = UserSchema.parse(result); // blogPost is BlogPost!
      return user;
    }
  });
}
