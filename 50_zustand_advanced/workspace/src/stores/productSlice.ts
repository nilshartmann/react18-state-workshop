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
  product: {
    products: IProduct[];
    removeProduct(productId: string): void;
    increasePrice(productId: string, amount: number): void;
  };
};

export const createProductSlice: StateCreator<
  ProductSlice & ShoppingCartSlice,
  [["zustand/immer", never], never],
  [],
  ProductSlice
> = (set, get) => ({
  product: {
    products: [
      { id: "P1", label: "Bottle of wine", price: 12 },
      { id: "P2", label: "Potatoe", price: 4.5 },
      { id: "P3", label: "Fish", price: 8 },
    ],
    removeProduct(productId: string) {
      // // Atomar, aber architekturell ... hmmm....
      // get().updateItemQuantity(productId, -100000);

      return set(({ product }) => {
        const ix = product.products.findIndex((p) => p.id === productId);
        if (ix === -1) {
          return;
        }

        product.products.splice(ix, 1);
      });
    },
    increasePrice(productId: string, amount: number) {
      return set((state) => {
        const product = state.product.products.find((p) => p.id === productId);
        if (product) {
          product.price += amount;
        }
      });
    },
  },
});
