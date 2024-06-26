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
//   1. Implementiere den ShoppingCartStore!
//     - Das Schema ist bereits in festgelegt (s. type ShoppingCartStore)
//     - Der Store soll die immer-Middleware verwenden
//     - Als initiale Daten kannst Du 'initialItems' von oben verwenden, da wir noch keine Logik
//        zum Hinzufügen von CartItems haben
//     - Die Logik zur Hinzufügen bzw. Ändern der quantity entspricht der Logik aus
//       der bekannten updateShoppingCart-Funktion
//       (Du kannst deinen fertigen Code dieser Funktion hier integrieren
//       oder Du nimmst den Code aus 40_immutability/material/25_immer/solution/updateShoppingCartImmer.ts)
//   2. Vervollständige die Komponenten in 'ShoppingCartApp.tsx', damit diese deinen
//       Store verwenden.
//       - Weitere TODOs findest Du dort

export const useShoppingCartStore = create<ShoppingCartStore>()(
  immer((set, get) => ({
    items: initialItems,
    addItem(productId: string) {
      get().updateItemQuantity(productId, 1);
    },
    updateItemQuantity(productId: string, amount: number) {
      // draft is now  WritableDraft<ShoppingCartStore> thanks to immer middleware
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
