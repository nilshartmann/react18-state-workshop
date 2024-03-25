import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IProduct } from "../shopping-cart.types.ts";

// Annahme: die Produkte wurden aus dem Backend gelesen
//   normalerweise würden Updates über das Backend passieren,
//   darauf verzichten wir hier aber der einfachheithalber
//  auch die Funktion "increasePrice" wäre eine Information aus dem Backend
//   vielleicht gäb es eine API die periodisch gepollt wird und
//   dann Preisänderungen in den Store einpflegt
export type ProductSlice = {
  products: IProduct[];
  removeProduct(productId: string): void;
  increasePrice(productId: string, amount: number): void;
};

export const createProductSlice: StateCreator<
  ProductSlice,
  [["zustand/immer", never], never],
  [],
  ProductSlice
> = (set, get) => ({
  products: [
    { id: "P1", label: "Bottle of wine", price: 12 },
    { id: "P2", label: "Potatoe", price: 4.5 },
    { id: "P3", label: "Fish", price: 8 },
  ],
  removeProduct(productId: string) {
    return set((state) => {
      const ix = state.products.findIndex((p) => p.id === productId);
      if (ix === -1) {
        return;
      }

      state.products.splice(ix, 1);
    });
  },
  increasePrice(productId: string, amount: number) {
    return set((state) => {
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.price += amount;
      }
    });
  },
});

export const _createProductslice = create<ProductSlice>()(
  immer((set, get) => ({
    products: [
      { id: "P1", label: "Bottle of wine", price: 12 },
      { id: "P2", label: "Potatoe", price: 4.5 },
      { id: "P3", label: "Fish", price: 8 },
    ],
    removeProduct(productId: string) {
      return set((state) => {
        const ix = state.products.findIndex((p) => p.id === productId);
        if (ix === -1) {
          return;
        }

        state.products.slice(ix, 1);
      });
    },
    increasePrice(productId: string, amount: number) {
      return set((state) => {
        const product = state.products.find((p) => p.id === productId);
        if (product) {
          product.price += amount;
        }
      });
    },
  })),
);
