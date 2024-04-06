import { createContext, ReactNode, useContext, useState } from "react";
import { invariant } from "@epic-web/invariant";

type Lang = "en" | "de";
type MessageId = "not_found" | "invalid_user_id";
type Messages = Record<MessageId, string>;

const messages_de: Messages = {
  not_found: "Nicht gefunden",
  invalid_user_id: "User-Id ungültig",
};

const messages_en: Messages = {
  not_found: "Not found",
  invalid_user_id: "User is invalid",
};

const messages: Record<Lang, Messages> = {
  de: messages_de,
  en: messages_en,
};

// ================================================================================================================
//
//   TODO: Stelle die Context-basierte App auf 'Zustand' um.
//         - Statt des React Contexts wollen wir jetzt Zustand verwenden
//           - Den Code vom Context kannst Du auskommentieren oder löschen, ich habe ihn hier
//             nur drin gelassen, damit Du weißt, was Du umstellen musst :-)
//         - Die Fachlichkeit soll identisch bleiben
//         - brauchen wir das `message`-Property in unserem Zustand-Store?
//         - Kannst Du in deiner Komponente die Selektoren so schreiben, dass wir
//           weniger Renderzyklen als beim Kontext haben (bzw. das weniger Komponenten neu gerendert werden,
//           wenn sich eine der Informationen im Store ändert)?
//           - zur Anzeige der Renderings in `Container.tsx` zwei Werte setzen:
//             - showRenderings = true
//             - hideBorder = false
//             - - - > Das ist eine sehr hemdsärmelige Art, die Renderings anzuzeigen. Im "echten Leben"
//               besser den Profiler von React verwenden!
//         - (wofür) würdest Du in der Zustand-Variante der Anwendung Custom Hooks schreiben?
//
// ================================================================================================================

// Sieht die Struktur des Zustand-Stores genauso aus wie der Context? 🤔
type INotificationContext = {
  messageId: MessageId | null;
  message: string | null;
  lang: Lang;

  showNotification(messageId: MessageId | null): void;
  setLanguage(lang: Lang): void;
};

// Das kannst Du alles entfernen, wenn Du den Zustand Store eingefügt hast.
//

const NotificationContext = createContext<INotificationContext | null>(null);

type NotificationContextProviderProps = {
  children?: ReactNode;
};
export default function NotificationContextProvider({
  children,
}: NotificationContextProviderProps) {
  const [messageId, setMessageId] = useState<MessageId | null>(null);
  const [language, setLanguage] = useState<Lang>("en");

  const showNotification = (newMessageId: MessageId | null) => {
    setMessageId(newMessageId);
  };

  const message = messageId ? messages[language][messageId] : null;

  return (
    <NotificationContext.Provider
      value={{
        messageId,
        message,
        lang: language,
        showNotification,
        setLanguage,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

// Machen Custom Hooks mit Zustand Sinn?
// Falls ja: welche? Falls nein: warum nicht?
export function useNotificationContext(): INotificationContext {
  const ctx = useContext(NotificationContext);

  invariant(
    ctx !== null,
    "No NotificationContext found. Please add NotificationContextProvider.",
  );

  return ctx;
}
