import { useGetUser } from "./use-user-query";

type UserDetailsProps = {
  postId: string;
};
export function UserDetails({ postId }: UserDetailsProps) {
  const { data } = useGetUser(postId);
  return <p>Written by: {data.username}</p>;
}
