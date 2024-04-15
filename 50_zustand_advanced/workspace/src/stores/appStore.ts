import { create, StateCreator } from "zustand";
import { createProductSlice, ProductSlice } from "./productSlice.ts";
import { immer } from "zustand/middleware/immer";
import { useCallback } from "react";
import { removeListener } from "@reduxjs/toolkit";
import {
  createShoppingCartSlice,
  ShoppingCartSlice,
} from "./shoppingCartSlice.ts";

type AppSlice = {
  removeProductFromStore(productId: string): void;
};

const createAppSlice: StateCreator<
  AppSlice & ProductSlice & ShoppingCartSlice,
  [["zustand/immer", never], never],
  [],
  AppSlice
> = (set, get) => {
  return {
    removeProductFromStore(productId: string) {
      get().product.removeProduct(productId);
      get().shoppingCart.updateItemQuantity(productId, -100000000); // 🙀 🫣 'removeFromCart'-Action wäre im Store toll...
    },
  };
};

export const useAppStore = create<
  ProductSlice & ShoppingCartSlice & AppSlice
>()(
  immer((...a) => ({
    ...createProductSlice(...a),
    ...createShoppingCartSlice(...a),
    ...createAppSlice(...a),
  })),
);

// const useProductSlice = () => {
//   return useAppStore(s => s.product);
// }

// function useProductsWithPriceLargerThan(price: number) {
//   useAppStore(s => s.items.find(...))
// }

function A() {
  const item = useAppStore((s) => s.items);
  const products = useAppStore((s) => s.products);

  //
}
