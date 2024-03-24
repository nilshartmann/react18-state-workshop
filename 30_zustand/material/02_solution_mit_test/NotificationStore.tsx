import { create } from "zustand";

type Lang = "en" | "de";
type MessageId = "not_found" | "invalid_user_id";
type Messages = Record<MessageId, string>;

// Annahme: die Messages ändern sich zur Laufzeit nicht
//  typischerweise werden diese aus einer i18n-Datei pro Sprache gelesen
//  - Dann ändert sich die Sprache zur Laufzeit, aber nicht die Messages
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

// entspricht weitgehend im INotificationContext,
//  nur message fehlt hier; dafür verwenden wir einen Selektor
type INotificationStore = {
  messageId: MessageId | null;
  lang: Lang;

  showNotification(messageId: MessageId | null): void;
  setLanguage(lang: Lang): void;
};

export const useNotificationStore = create<INotificationStore>()((set) => ({
  messageId: null,
  lang: "en",

  showNotification(messageId) {
    set({ messageId });
  },
  setLanguage(newLanguage) {
    set({ lang: newLanguage });
  },
}));

export function useNotificationMessage(): string | null {
  const messageId = useNotificationStore((state) => state.messageId);
  // 🤔 🤔 🤔 🤔 🤔 🤔 🤔 🤔
  // Warum können wir hier nicht prüfen:
  //  if (!messageId) {
  //    return null;
  // }
  const lang = useNotificationStore((state) => state.lang);

  if (!messageId) {
    return null;
  }

  return messages[lang][messageId];
}
