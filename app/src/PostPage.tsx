import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { useGetUser, usePreloadUser } from "./use-user-query";
import { Suspense } from "react";
import { UserDetails } from "./UserDetails";

export default function PostPage() {
  const { postId } = useParams();

  if (!postId) {
    throw new Error("Param 'postId' missing!");
  }

  // usePreloadUser(postId);

  // So wird Post oder UserDetails angezeigt, sobald eine der beiden
  // Komponenten gerendert werden kann, weil deren Daten geladen wurde
  // Für die jeweils andere Komponente wird weiterhin die Fallback-
  // Komponente angezeigt.
  //
  // Wenn man auf *beide* warten wollte, müsste
  // man die Suspense-Komponente um beide Komponenten legen

  return (
    <>
      <Link className="Button" to="/">
        Home
      </Link>
      <Suspense fallback={<b>Loading Blog Post</b>}>
        <Post postId={postId} />
      </Suspense>

      <Suspense fallback={<b>Loading user...</b>}>
        <UserDetails postId={postId} />
      </Suspense>
    </>
  );
}
