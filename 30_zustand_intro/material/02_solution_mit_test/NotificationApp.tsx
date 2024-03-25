import Container from "./Container.tsx";
import {
  useNotificationMessage,
  useNotificationStore,
} from "./NotificationStore.tsx";
import { useShallow } from "zustand/react/shallow";

export default function NotificationApp() {
  return (
    <Container title={"App"}>
      <div className={"SameSizeFlex"}>
        <NotificationBar />
        <NotificationTrigger />
        <NotificationStatus />
      </div>
    </Container>
  );
}

function NotificationBar() {
  // TODO: Lies die aktuelle Nachricht aus dem NotificationContext uns zeige sie unten an
  const message = useNotificationMessage();

  return (
    <Container title={"NotificationBar"}>
      {message ? <h1>{message}</h1> : <h1>Keine Notification</h1>}
    </Container>
  );
}

function NotificationTrigger() {
  // TODO: Implementiere 'onClick'-Handler für die Button, so dass
  //       die Button die im Label beschriebenen Aktionen im Context
  //       durchführen

  // 🤔🤔🤔🤔🤔
  //  - was passiert, wenn wir auf das 'useShallow' verzichten?
  //  - welche Alternativen gäbe es?
  // 🤔🤔🤔🤔🤔
  const actions = useNotificationStore(
    useShallow((state) => ({
      showNotification: state.showNotification,
      setLanguage: state.setLanguage,
    })),
  );

  return (
    <Container title={"NotificationTrigger"}>
      <div className={"Flex"}>
        <button onClick={() => actions.showNotification("not_found")}>
          Set 'not_found' notification
        </button>
        <button onClick={() => actions.showNotification("invalid_user_id")}>
          Set 'invalid_user_id' notification
        </button>
        <button onClick={() => actions.showNotification(null)}>
          Clear notification
        </button>
      </div>
      <div>
        <button onClick={() => actions.setLanguage("de")}>
          Set Language to 'de'
        </button>
        <button onClick={() => actions.setLanguage("en")}>
          Set Language to 'en'
        </button>
      </div>
    </Container>
  );
}

function NotificationStatus() {
  // TODO:
  //   - Prüfe ob zzt. eine Nachricht im Context gesetzt ist
  //     und zeige dann an, dass eine Nachricht gesetzt ist, bzw. das keine
  //     Nachricht gesetzt ist.
  //     Also nur die Info ob Nachricht (nicht) gesetzt ist, aber nicht die eigentliche Nachricht
  const hasNotification = useNotificationStore(
    (state) => state.messageId !== null,
  );
  // 🤔🤔🤔🤔🤔
  //  - warum nicht so:
  // const messageId = useNotificationStore((state) => state.messageId);
  // const hasNotification = messageId !== null;
  // 🤔🤔🤔🤔🤔

  return (
    <Container title={"NotificationStatus"}>
      {hasNotification
        ? "Es ist eine Notification gesetzt"
        : "Es ist keine Notification gesetzt"}
    </Container>
  );
}
