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
//   TODO: Stelle den Context auf 'Zustand' um.
//         - Statt des React Contexts wollen wir jetzt Zustand verwenden
//         - Die Fachlichkeit soll identisch bleiben
//         - Kannst Du Selektoren implementieren, die das Rendering gegenüber dem Context
//           optimieren?
//
// ================================================================================================================

type INotificationContext = {
  messageId: MessageId | null;
  message: string | null;
  lang: Lang;

  showNotification(messageId: MessageId | null): void;
  setLanguage(lang: Lang): void;
};

//
const NotificationContext = createContext<INotificationContext | null>(null);

type NotificationContextProviderProps = {
  children?: ReactNode;
};
export default function NotificationContextProvider({
  children,
}: NotificationContextProviderProps) {
  // Implementiere hier die Context-Logik
  //  - welche Informationen aus dem NotificationContext benötigst Du hier im State? Wieviele States verwendest Du?
  //  - Denk' daran, dass man sowohl die Message als auch die Sprache unabhängig voneinander ändern kann
  //  - Verwende NotificationContext.Provider um das Context-Objekt zu setzen (value-Property)
  //  - Als Kind-Element von NotificationContext.Provider musst Du das 'children' Property übergeben, das
  //    an diese (NotificationContextProvider) Komponente übergeben wurde

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

export function useNotificationContext(): INotificationContext {
  // Implementiere diesen Custom Hook
  //   Dieser soll
  const ctx = useContext(NotificationContext);

  invariant(
    ctx !== null,
    "No NotificationContext found. Please add NotificationContextProvider.",
  );

  return ctx;
}
