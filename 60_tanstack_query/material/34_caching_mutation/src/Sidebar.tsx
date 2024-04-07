import { useGetBlogPost } from "./get-post";
import { useLikeMutation } from "./use-like-mutation";

export default function Sidebar() {
  const { data } = useGetBlogPost("P10");
  const likeMutation = useLikeMutation("P10");

  if (!data) {
    return;
  }

  return (
    <div className="Sidebar">
      <p>{data.title}</p>
      <p>Likes: {data.likes}</p>
      <button onClick={() => likeMutation.mutate()}>Like !</button>
    </div>
  );
}
