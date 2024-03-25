import PostList from "./PostList";
import { BlogPost } from "./types";
import { useQuery } from "@tanstack/react-query";
function fetchPosts(): Promise<BlogPost[]> {
  return fetch("http://localhost:7000/posts?short&slow").then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Failed to load posts!");
  });
}
export default function PostListPage() {
  const { isLoading, isError, isSuccess, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts
  });

  // React.useEffect(() => {
  //   fetch("http://localhost:7000/posts?short")
  //     .then(response => response.json())
  //     .then(json => {
  //       setPosts(json);
  //     })
  //     .catch(err => console.error("Loading data failed: " + err));
  // }, []);

  if (isError) {
    console.error(error);
    return <h1>Error loading posts!</h1>;
  }

  if (isLoading) {
    return <h1>Loading, please wait...</h1>;
  }

  if (!isSuccess) {
    return null;
  }

  return <PostList posts={data} />;
}
