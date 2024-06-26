import React from "react";
import { useNavigate } from "react-router-dom";
import { useSaveBlogPostMutation } from "./use-save-post-mutation.ts";

export default function PostEditor() {
  const navigate = useNavigate();
  const saveMutation = useSaveBlogPostMutation();

  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  async function handleSave() {
    const newPost = { title, body };
    await saveMutation.mutateAsync(newPost);

    navigate("/");
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
          onChange={(e) => {
            saveMutation.reset();
            setTitle(e.currentTarget.value);
          }}
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
          onChange={(e) => {
            saveMutation.reset();
            setBody(e.currentTarget.value);
          }}
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
      <button disabled={saveButtonDisabled} onClick={() => handleSave()}>
        Save Post
      </button>
      <button onClick={() => navigate("/")}>Close</button>
      {saveMutation.isError && (
        <p>Fehler beim Speichern des Posts: {String(saveMutation.error)}</p>
      )}
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
