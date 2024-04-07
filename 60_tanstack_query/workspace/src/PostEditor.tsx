import React from "react";
import { BlogPost, NewBlogPost } from "./types";
import { useNavigate } from "react-router-dom";

export default function PostEditor() {
  const navigate = useNavigate();

  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  async function savePost(post: NewBlogPost) {
    const response = await fetch("http://localhost:7000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    navigate("/");
  }

  const clearDisabled = !title && !body;
  const saveButtonDisabled = !title || !body;

  return (
    <div className="Container">
      <h1>Create Post</h1>

      <label>
        Title
        <input value={title} onChange={e => setTitle(e.currentTarget.value)} />
      </label>
      {title ? (
        <Message type="info" msg="Title correctly filled"></Message>
      ) : (
        <Message type="error" msg="Please enter a title"></Message>
      )}

      <label>
        Body
        <textarea value={body} onChange={e => setBody(e.currentTarget.value)} />
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
            body
          });
        }}
      >
        Save Post
      </button>
      <button onClick={() => navigate("/")}>Close</button>
    </div>
  );
}

type MessageProps = {
  msg: string;
  type?: "error" | "info";
};

function Message({ msg, type = "error" }: MessageProps) {
  const style: React.CSSProperties =
    type === "error" ? { color: "red", fontWeight: "bold" } : { color: "green" };

  return <p style={style}>{msg}</p>;
}
