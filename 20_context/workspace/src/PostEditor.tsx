import React from "react";

type BlogPost = {
  title: string;
  body: string;
};

export type NewBlogPost = {
  title: string;
  body: string;
};

type PostEditorProps = {
  onSavePost: (post: NewBlogPost) => void;
};

export default function PostEditor({ onSavePost }: PostEditorProps) {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  function savePost(post: NewBlogPost) {
    onSavePost(post);
  }

  const clearDisabled = !title && !body;
  const saveButtonDisabled = !title || !body;

  return (
    <div className="Container">
      <h1>Create Post</h1>

      <label>
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </label>
      {title ? (
        <Message type="info" msg="Title correctly filled"></Message>
      ) : (
        <Message type="error" msg="Please enter a title"></Message>
      )}

      <label>
        Body
        <textarea
          value={body}
          onChange={(e) => setBody(e.currentTarget.value)}
        />
      </label>
      {body ? (
        <Message type="info" msg="Body correctly filled"></Message>
      ) : (
        <Message msg="Please enter a body"></Message>
      )}

      <button
        disabled={clearDisabled}
        onClick={() => {
          setTitle("");
          setBody("");
        }}
      >
        Clear
      </button>
      <button
        disabled={saveButtonDisabled}
        onClick={() => {
          savePost({
            title,
            body,
          });
        }}
      >
        Save Post
      </button>
    </div>
  );
}

type MessageProps = {
  msg: string;
  type?: "error" | "info";
};

function Message({ msg, type = "error" }: MessageProps) {
  const style: React.CSSProperties =
    type === "error"
      ? { color: "red", fontWeight: "bold" }
      : { color: "green" };

  return <p style={style}>{msg}</p>;
}
