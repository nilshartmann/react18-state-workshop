import React, { useState } from "react";
import { useNotificationContext } from "./NotificationContext.tsx";
import { useErrorBoundary } from "react-error-boundary";

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

function useCurrentLocale() {
  const x = useState();
  return x;
}

function useMessageGenerator() {
  const currentLocale = useCurrentLocale();
  return function messageGenerator(messageId: string) {
    /* ... */
  };
}

// Custom Hook
function useMaxLengthState(initialValue: string, maxLength: number) {
  const [myState, setMyState] = React.useState(initialValue);
  const messageGenerator = useMessageGenerator();

  function changeMyState(newState: string) {
    setMyState(newState);
  }

  if (myState.length > maxLength) {
    return [myState, changeMyState, messageGenerator("too long")] as const;
  }

  return [myState, changeMyState, null] as const;
}

// Hook-Funktion
//   to hook => einhaken
//
//  1.  "Hello World"     |  setTitle
//  2.  "Abc"             |  setBody
//
//  Einschränkungen:
//    - Hook-Funktion nur in Funktionskomponenten und in anderen Hook-Funktion
//    - immer in gleicher Anzahl und Reihenfolge ausführen!
//  "Rules of hook": https://legacy.reactjs.org/docs/hooks-rules.html
export default function PostEditor({ onSavePost }: PostEditorProps) {
  const [title, setTitle, errorMessage] = useMaxLengthState("", 5); // "Hello World"
  const [body, setBody] = React.useState(""); // "Abc"
  const eb = useErrorBoundary();

  // OK:
  // const ctx = useNotificationContext();

  function savePost(post: NewBlogPost) {
    // VERBOTEN:
    // useNotificationContext()

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
      {/*<p>{errorMessage}</p>*/}

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
          eb.showBoundary("Das Eingabefeld konnte nicht gelöscht werden.");

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
