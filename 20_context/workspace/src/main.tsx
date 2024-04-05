import ReactDOM from "react-dom/client";
import "./index.css";
import NotificationApp from "./NotificationApp.tsx";
import PostEditor from "./PostEditor.tsx";

// Hier gibt es drei Apps:
// - CounterApp fuer Live-Coding-Beispiel
// - NotificationApp fuer Uebung
// - je nach Bedarf 'render' anpassen:

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PostEditor onSavePost={() => {}} />,
);
