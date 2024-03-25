import { IShoppingCartItem } from "../shopping-cart.types.ts";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ShoppingCartStore = {
  items: IShoppingCartItem[];
  // Aufgabe: wenn das Item bereits vorhanden ist,
  //   soll es erhöht werden! Sonst neu hinzufügen!
  //   Identisch zu updateQuantity(productId, 1)
  addItem(productId: string): void;
  // Wenn productId nicht in den Items vorhanden ist => passiert nichts
  // Wenn productId vorhanden ist,
  //   amount kann +number oder -number sein
  //   Wenn berechneter Wert <1, dann Produkt entfernen
  //  --> Logik entspricht unserer updateShoppingCart-Funktion aus der letzten Übung!
  //
  updateItemQuantity(productId: string, amount: number): void;
};

const initialItems: IShoppingCartItem[] = [
  { productId: "P1", quantity: 2 },
  { productId: "P2", quantity: 1 },
];

// TODO:
//  1. Stelle diesen Store auf einen Slice mit einem StateCreator um
//    Für den State-Creator brauchst Du vier Typ-Argumente:
//     1.: Kompletter State der Anwendung (hier reicht aber ShoppingCartStore)
//     2.: Mutator-Funktion (hier: "immer middleware"). Verwende dafür: [["zustand/immer", never], never]
//     3.: hier bitte einfach [] als Typ angeben
//     4.: ShoppingCartStore
//
//  2. Baue den kompletten Store in appStore.ts zusammen
//  3. Vervollständige die ShoppingCartApp.tsx-Datei
//     1. Diese muss nun den neuen State mit Slices verwenden (bestehende Komponenten anpassen!)
//     2. Eine Liste aller Produkte soll angezeigt werden
//     -> Du kannst Deine ShoppingCartApp.tsx anpassen oder Du nimmst sie aus diesem Verzeichnis
//        (das ist vorallem für die Produkt-Liste sinnvoll, dort findest Du nämlich schon TODOs.
//         Du kannst natürlich auch deine ShoppingCartApp mit dieser hier kombinieren :-)

export const useShoppingCartStore = create<ShoppingCartStore>()(
  immer((set, get) => ({
    items: initialItems,
    addItem(productId: string) {
      get().updateItemQuantity(productId, 1);
    },
    updateItemQuantity(productId: string, amount: number) {
      // draft is now  WritableDraft thanks to immer middleware
      set((draft) => {
        if (amount === 0) {
          return;
        }

        const existingItem = draft.items.find((p) => p.productId === productId);
        if (!existingItem) {
          if (amount < 1) {
            // item is not present, amount is < 1 => nothing to do
            return;
          }

          draft.items.push({
            productId,
            quantity: amount,
          });
          return;
        }

        // item is present
        const newQuantity = existingItem.quantity + amount;
        if (newQuantity < 1) {
          const ix = draft.items.findIndex((p) => p.productId === productId);
          draft.items.splice(ix, 1);
          return;
        }

        existingItem.quantity = newQuantity;
      });
    },
  })),
);
