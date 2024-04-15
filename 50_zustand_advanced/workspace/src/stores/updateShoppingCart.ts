import { IShoppingCart } from "../shopping-cart.types.ts";
import { produce } from "immer";
export function updateShoppingCartImmer(
  cart: IShoppingCart,
  productId: string,
  amount: number,
): IShoppingCart {
  return produce(cart, (draft) => {
    if (amount === 0) {
      return;
    }

    const existingItem = draft.items.find((p) => p.productId === productId);
    if (!existingItem) {
      if (amount < 1) {
        // item is not present, amount is < 1 => nothing to do
        return;
      }

      draft.items.push({
        productId,
        quantity: amount,
      });

      return;
    }

    // item is present
    const newQuantity = existingItem.quantity + amount;
    if (newQuantity < 1) {
      const ix = draft.items.findIndex((p) => p.productId === productId);
      draft.items.splice(ix, 1);
      return;
    }

    existingItem.quantity = newQuantity;
  });
}
