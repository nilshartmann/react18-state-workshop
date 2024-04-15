import Container from "./Container.tsx";
import {
  useNotificationActions,
  useNotificationMessage,
  useNotificationStore,
} from "./NotificationContext.tsx";
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
  const message = useNotificationMessage();

  return (
    <Container title={"NotificationBar"}>
      {message ? <h1>{message}</h1> : <h1>Keine Notification</h1>}
    </Container>
  );
}

function NotificationTrigger() {
  // const store = useNotificationStore( s => s);
  // store.messageId = "not_found"
  // Object.is(oldSelectorValue, newSelectorValue);
  // // oldSelectorValue === newSelectorValue

  // NEIN!!!!!!!!!!!!!
  // const store = useNotificationStore();
  //
  // JA !!!!!!!!!!!!!!!!
  // const showNotification = useNotificationStore((s) => s.showNotification);
  // const setLanguage = useNotificationStore((s) => s.setLanguage);
  //
  // JA!!!!!!!!! ABER...........
  // const { showNotification, setLanguage } = useNotificationActions()
  //
  // NEIN!!!!!!!!!!!!!!!!!!!!!!!
  // const { showNotification, setLanguage } = useNotificationStore((s) => ({
  //   showNotification: s.showNotification,
  //   setLanguage: s.setLanguage,
  // }));
  //
  // // JA!!!! ABER !!!!!!!!!!!!!!!!!
  const { showNotification, setLanguage } = useNotificationStore(
    useShallow((s) => ({
      showNotification: s.showNotification,
      setLanguage: s.setLanguage,
    })),
  );

  return (
    <Container title={"NotificationTrigger"}>
      <div className={"Flex"}>
        <button onClick={() => showNotification("not_found")}>
          Set 'not_found' notification
        </button>
        <button onClick={() => showNotification("invalid_user_id")}>
          Set 'invalid_user_id' notification
        </button>
        <button onClick={() => showNotification(null)}>
          Clear notification
        </button>
      </div>
      <div>
        <button onClick={() => setLanguage("de")}>Set Language to 'de'</button>
        <button onClick={() => setLanguage("en")}>Set Language to 'en'</button>
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
  // const hasNotification2 = messageId !== null;
  // 🤔🤔🤔🤔🤔

  return (
    <Container title={"NotificationStatus"}>
      {hasNotification
        ? "Es ist eine Notification gesetzt"
        : "Es ist keine Notification gesetzt"}
    </Container>
  );
}
