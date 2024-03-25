import { create } from "zustand";
import {
  createShoppingCardSlice,
  ShoppingCartSlice,
} from "./shoppingCartSlice.ts";
import { createProductSlice, ProductSlice } from "./productSlice.ts";
import { immer } from "zustand/middleware/immer";

const useAppStore = create<ProductSlice & ShoppingCartSlice>()(
  immer((...a) => ({
    ...createProductSlice(...a),
    ...createShoppingCardSlice(...a),
  })),
);
