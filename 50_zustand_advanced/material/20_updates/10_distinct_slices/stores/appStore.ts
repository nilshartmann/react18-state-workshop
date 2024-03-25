import { create } from "zustand";
import { createProductSlice, ProductSlice } from "./productSlice.ts";
import { immer } from "zustand/middleware/immer";
import { useCallback } from "react";
import { removeListener } from "@reduxjs/toolkit";
import {
  createShoppingCartSlice,
  ShoppingCartSlice,
} from "./shoppingCartSlice.ts";

// TODO: "appStore" mit 'create' erzeugen:
//   - besteht aus "ProductSlice & ShoppingCartSlice"
//     (oder "ProductSlice & ShoppingCartStore", je nachdem wie Du deine Typen nennst)
//   - binde die 'immer'-Middleware ein
export const useAppStore = create<ProductSlice & ShoppingCartSlice>()(
  immer((...a) => ({
    ...createProductSlice(...a),
    ...createShoppingCartSlice(...a),
  })),
);

// Ist dieser Hook eine gute Idee?
//  -> was ginge besser?
export function useRemoveProduct() {
  const removeProductFromStore = useAppStore((s) => s.removeProduct);
  const updateItemQuantity = useAppStore((s) => s.updateItemQuantity);

  const removeProduct = useCallback(
    (productId: string) => {
      removeProductFromStore(productId);
      updateItemQuantity(productId, -100000000); // 🙀 🫣 'removeFromCart'-Action wäre im Store toll...
    },
    [removeProductFromStore, updateItemQuantity],
  );

  return removeProduct;
}
