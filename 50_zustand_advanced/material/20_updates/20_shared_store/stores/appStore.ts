import { create, StateCreator } from "zustand";
import {
  createShoppingCardSlice,
  ShoppingCartSlice,
} from "./shoppingCartSlice.ts";
import { createProductSlice, ProductSlice } from "./productSlice.ts";
import { immer } from "zustand/middleware/immer";
import { useCallback } from "react";
import { removeListener } from "@reduxjs/toolkit";

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
      get().removeProduct(productId);
      get().updateItemQuantity(productId, -100000000); // 🙀 🫣 'removeFromCart'-Action wäre im Store toll...
    },
  };
};

export const useAppStore = create<
  ProductSlice & ShoppingCartSlice & AppSlice
>()(
  immer((...a) => ({
    ...createProductSlice(...a),
    ...createShoppingCardSlice(...a),
    ...createAppSlice(...a),
  })),
);

// Ist dieser Hook eine gute Idee?
//  -> was ginge besser?
export function useRemoveProduct() {
  const removeProductFromStore = useAppStore((s) => s.removeProductFromStore);

  const removeProduct = useCallback(
    (productId: string) => {
      removeProductFromStore(productId);
    },
    [removeProductFromStore],
  );

  return removeProduct;
}
