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

// Machen Custom Hooks mit Zustand Sinn?
// Falls ja: welche? Falls nein: warum nicht?
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
