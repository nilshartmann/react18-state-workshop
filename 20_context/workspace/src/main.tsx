import ReactDOM from "react-dom/client";
import "./index.css";
import NotificationApp from "./NotificationApp.tsx";
import PostEditor from "./PostEditor.tsx";
import App from "./CounterApp.tsx";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

// Hier gibt es drei Apps:
// - CounterApp fuer Live-Coding-Beispiel
// - NotificationApp fuer Uebung
// - je nach Bedarf 'render' anpassen:

function PostEditorFallback(props: FallbackProps) {
  return (
    <div>
      <h1>Es ist ein Fehler aufgetreten</h1>
      {String(props.error)}
      <button onClick={() => props.resetErrorBoundary()}>
        Nochmal probieren!
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary
    FallbackComponent={PostEditorFallback}
    onError={(error, info) => {
      console.log("COMPONENT STACK:");
      console.log(info.componentStack);
    }}
  >
    <PostEditor onSavePost={() => {}} />
  </ErrorBoundary>,
);
