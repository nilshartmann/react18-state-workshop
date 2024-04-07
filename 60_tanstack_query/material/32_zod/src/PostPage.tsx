import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { useGetBlogPost } from "./get-post";

export default function PostPage() {
  const { postId } = useParams();

  if (!postId) {
    throw new Error("Param 'postId' missing!");
  }

  const { data, isError, error, isLoading } = useGetBlogPost(postId);

  if (isError) {
    console.error("Could not load blog post", error);
    return <h1>Error :-(</h1>;
  }

  if (isLoading || !data) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Link className="Button" to="/">
        Home
      </Link>
      <Post post={data} />
    </>
  );
}
