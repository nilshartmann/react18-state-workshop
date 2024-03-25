import { StateCreator } from "zustand";
import { IShoppingCartItem } from "../shopping-cart.types.ts";

export type ShoppingCartSlice = {
  items: IShoppingCartItem[];
  // Aufgabe: wenn das Item bereits vorhanden ist,
  //   soll es erhöht werden! Sonst neu hinzufügen!
  //   Identisch zu updateQuantity(productId, 1)
  addItem(productId: string): void;
  // Wenn productId nicht in den Items vorhanden ist => passiert nichts
  // Wenn productId vorhanden ist,
  //   amount kann +number oder -number sein
  //   Wenn berechneter Wert <1, dann Produkt entfernen
  //
  updateItemQuantity(productId: string, amount: number): void;
};

export const createShoppingCardSlice: StateCreator<
  ShoppingCartSlice,
  [["zustand/immer", never], never],
  [],
  ShoppingCartSlice
> = (set, get) => ({
  items: [],
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
});
// export const createShoppingCartSlice = create<ShoppingCartSlice>()(
//   immer((set, get) => ({
//     items: [],
//     addItem(productId: string) {
//       get().updateItemQuantity(productId, 1);
//     },
//     updateItemQuantity(productId: string, amount: number) {
//       // draft is now  WritableDraft thanks to immer middleware
//       set((draft) => {
//         if (amount === 0) {
//           return;
//         }
//
//         const existingItem = draft.items.find((p) => p.productId === productId);
//         if (!existingItem) {
//           if (amount < 1) {
//             // item is not present, amount is < 1 => nothing to do
//             return;
//           }
//
//           draft.items.push({
//             productId,
//             quantity: amount,
//           });
//           return;
//         }
//
//         // item is present
//         const newQuantity = existingItem.quantity + amount;
//         if (newQuantity < 1) {
//           const ix = draft.items.findIndex((p) => p.productId === productId);
//           draft.items.splice(ix, 1);
//           return;
//         }
//
//         existingItem.quantity = newQuantity;
//       });
//     },
//   })),
// );
