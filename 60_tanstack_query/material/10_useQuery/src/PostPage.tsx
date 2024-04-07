import React from "react";
import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { BlogPost } from "./types";

export default function PostPage() {
  const { postId } = useParams();

  if (!postId) {
    throw new Error("Param 'postId' missing!");
  }

  const [post, setPost] = React.useState<BlogPost | null>(null);

  React.useEffect(() => {
    fetch(`http://localhost:7000/posts/${postId}?slow`)
      .then(response => response.json())
      .then(json => {
        setPost(json);
      })
      .catch(err => console.error("Loading data failed: " + err));
  }, [postId]);

  // simplified => no explicit loading state. Also no errors covered here.
  if (!post) {
    return <h1>Please wait, Post is loading</h1>;
  }

  return (
    <>
      <Link className="Button" to="/">
        Home
      </Link>
      <Post post={post} />
    </>
  );
}
