import Container from "./Container.tsx";
import {
  useNotificationMessage,
  useNotificationStore,
} from "./NotificationStore.tsx";
import { useShallow } from "zustand/react/shallow";

export default function NotificationApp() {
  // todo: Den NotificationContextProvider entfernen (ersatzlos streichen)
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
  // TODO: Lies die aktuelle Nachricht aus dem Store uns zeige sie unten an
  const { message } = useNotificationContext();

  return (
    <Container title={"NotificationBar"}>
      {message ? <h1>{message}</h1> : <h1>Keine Notification</h1>}
    </Container>
  );
}

function NotificationTrigger() {
  // TODO: Implementiere 'onClick'-Handler für die Button, so dass
  //       die Buttons jeweils die entsprechende Action im Zustand Store ausführen
  //       - Achtung! Diese Komponente sollte sich nur ändern, wenn sich eine der Actions
  //         ändert. (Also faktisch nie, denn die Actions ändern sich ja nicht...)
  //         - Die Komponente soll sich NICHT neu rendern, wenn eine Message oder Sprache gesetzt
  //           oder geändert wird
  //         - was musst Du dafür machen bzw. beachten?
  //       - Die Anzahl der Renderings zeigt die Container-Komponente an
  //           (ggf. showRenderings = true setzen in Container.tsx)

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
  //   Überprüfe hier, ob eine Message im Zustand-Store vorliegt und zeige diese Information an
  //   Die Komponente sollte sich nur dann neu Rendern, wenn sich diese Information ändert
  //   D.h:
  //    - wenn eine Message gesetzt ist und diese sich ändert oder die Sprache sich ändert => nicht neu rendern
  //    - wenn eine Message gesetzt war und nun nicht mehr => neu rendern, damit die Status-Anzeige aktualisiert wird
  //    - wenn keine Message gesetzt war und nun eine ist => neu rendern, damit die Status-Anzeige aktualisiert wird
  //  Die Anzahl der Renderings zeigt die Container-Komponente an
  //   (ggf. showRenderings = true setzen in Container.tsx)
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
