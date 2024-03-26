import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { useGetBlogPost } from "./get-post";

export default function PostPage() {
  const { postId } = useParams();

  if (!postId) {
    throw new Error("Param 'postId' missing!");
  }

  const { data, isError, isLoading } = useGetBlogPost(postId);

  if (isError) {
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
