import React from "react";
import moment from "moment";
import { useGetBlogPost } from "./get-post";
function formattedDate(date: string) {
  return moment(date).format("DD.MM.YYYY");
}

type PostProps = {
  postId: string;
};

export default function Post({ postId }: PostProps) {
  const { data: post } = useGetBlogPost(postId);

  return (
    <article className="Container">
      <p className="Date">{formattedDate(post.date)}</p>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Likes: {post.likes}</p>
    </article>
  );
}
