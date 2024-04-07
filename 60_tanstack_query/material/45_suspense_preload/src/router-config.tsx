import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import PostListPage from "./PostListPage";
import Page from "./Page";
import PostPage from "./PostPage";
import PostEditorPage from "./PostEditorPage";
import NotFoundPage from "./NotFound";

export const routerConfig = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Page />}>
      <Route index element={<PostListPage />} loader={() => ""} />
      <Route path="/post/:postId" element={<PostPage />} />
      <Route path="/add" element={<PostEditorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
