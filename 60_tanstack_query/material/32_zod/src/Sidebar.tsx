import { useGetBlogPost } from "./get-post";

export default function Sidebar() {
  const { data } = useGetBlogPost("P10");

  if (!data) {
    return;
  }

  return (
    <div className="Sidebar">
      <p>{data.title}</p>
      <p>Likes: {data.likes}</p>
    </div>
  );
}
