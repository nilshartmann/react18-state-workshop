import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IProduct } from "../shopping-cart.types.ts";
import { ShoppingCartSlice } from "./shoppingCartSlice.ts";

// Annahme: die Produkte wurden aus dem Backend gelesen
//   normalerweise würden Updates über das Backend passieren,
//   darauf verzichten wir hier aber der einfachheithalber
//  auch die Funktion "increasePrice" wäre eine Information aus dem Backend
//   vielleicht gäb es eine API die periodisch gepollt wird und
//   dann Preisänderungen in den Store einpflegt
export type ProductSlice = {
  shop: {
    products: IProduct[];
    actions: {
      removeProduct(productId: string): void;
      increasePrice(productId: string, amount: number): void;
    };
  };
};

export const createProductSlice: StateCreator<
  ProductSlice & ShoppingCartSlice,
  [["zustand/immer", never], never],
  [],
  ProductSlice
> = (set, get) => ({
  shop: {
    products: [
      { id: "P1", label: "Bottle of wine", price: 12 },
      { id: "P2", label: "Potatoe", price: 4.5 },
      { id: "P3", label: "Fish", price: 8 },
    ],
    actions: {
      removeProduct(productId: string) {
        set(({ shop }) => {
          const ix = shop.products.findIndex((p) => p.id === productId);
          if (ix === -1) {
            return;
          }

          shop.products.splice(ix, 1);
        });

        get().cart.actions.updateItemQuantity(productId, -100000000); // 🙀 🫣 'removeFromCart'-Action wäre im Store toll...
      },
      increasePrice(productId: string, amount: number) {
        return set(({ shop }) => {
          const product = shop.products.find((p) => p.id === productId);
          if (product) {
            product.price += amount;
          }
        });
      },
    },
  },
});
