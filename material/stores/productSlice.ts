import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";

type Product = {
  id: string;
  label: string;
  price: number;
  // In der Produkt-Liste soll angezeigt werden, ob sich ein
  // Produkt bereits im Warenkorb befindet
  // Filter => Produkte im Warenkorb nicht anzeigen
};

// Annahme: die Produkte wurden aus dem Backend gelesen
//   normalerweise würden Updates über das Backend passieren,
//   darauf verzichten wir hier aber der einfachheithalber
//  auch die Funktion "increasePrice" wäre eine Information aus dem Backend
//   vielleicht gäb es eine API die periodisch gepollt wird und
//   dann Preisänderungen in den Store einpflegt
export type ProductSlice = {
  products: Product[];
  increasePrice(productId: string, amount: number): void;
};
// AGENDA

// Welche Möglichkeiten zur "Kombination" gibt es?
// - Slices #1: Globaler State, der seine Slices kennt und delegiert
// - Alternative zu Slice #1: Custom-Hook useRemoveProduct() der dann in beide Stores reingreift
// - Slices #2: Slices kennen sich untereinander 😱
//
// - Bei Variante #2 sollte man aufpassen:
//    - ist das wirklich noch "modular"
//      - oder verteilen wir nur Code?
// - Bei Slices:
//    - TS Wahnsinn
//

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
