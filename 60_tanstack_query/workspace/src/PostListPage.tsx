import React from "react";
import PostList from "./PostList";
import { BlogPost } from "./types";

export default function PostListPage() {
  const [posts, setPosts] = React.useState<BlogPost[] | null>(null);

  React.useEffect(() => {
    fetch("http://localhost:7000/posts?short")
      .then(response => response.json())
      .then(json => {
        setPosts(json);
      })
      .catch(err => console.error("Loading data failed: " + err));
  }, []);

  if (!posts) {
    return <h1>Loading, please wait...</h1>;
  }

  return <PostList posts={posts} />;
}
