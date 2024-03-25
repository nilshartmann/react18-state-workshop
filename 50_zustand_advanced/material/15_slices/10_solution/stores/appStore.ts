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
