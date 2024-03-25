import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import NotificationApp from "./NotificationApp.tsx";

// Hier gibt es drei Apps:
// - CounterApp fuer Live-Coding-Beispiel
// - NotificationApp fuer Uebung
// - MemoApp fuer Memo-Beispiel
// - je nach Bedarf 'render' anpassen:

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NotificationApp />,
);
