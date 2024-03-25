import { create, StateCreator } from "zustand";
import {
  createShoppingCardSlice,
  ShoppingCartSlice,
} from "./shoppingCartSlice.ts";
import { createProductSlice, ProductSlice } from "./productSlice.ts";
import { immer } from "zustand/middleware/immer";
import { useCallback } from "react";
import { removeListener } from "@reduxjs/toolkit";

export const useAppStore = create<ProductSlice & ShoppingCartSlice>()(
  immer((...a) => ({
    ...createProductSlice(...a),
    ...createShoppingCardSlice(...a),
  })),
);

// Ist dieser Hook eine gute Idee?
//  -> was ginge besser?
export function useRemoveProduct() {
  const removeProductFromStore = useAppStore((s) => s.removeProduct);

  const removeProduct = useCallback(
    (productId: string) => {
      removeProductFromStore(productId);
    },
    [removeProductFromStore],
  );

  return removeProduct;
}
