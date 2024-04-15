import Container from "./Container.tsx";
import { useAppStore } from "../../material/20_solutions/10_two_stores/stores/appStore.ts";
import { useShallow } from "zustand/react/shallow";
import { useShoppingCartStore } from "./stores/shoppingCartSlice.ts";
import { IShoppingCartItem } from "./shopping-cart.types.ts";

export default function ShoppingCartApp() {
  return (
    <Container title={"ShoppingCartApp"}>
      <div className={"SameSizeFlex"}>
        <ShoppingCart />
      </div>
    </Container>
  );
}

function ShoppingCart_Rendert_wenn_sich_item_oder_items_aenndern() {
  const items = useShoppingCartStore((s) => s.items);

  return (
    <Container title={"ShoppingCart"}>
      <h3>My Shopping Cart</h3>
      {items.map((item) => (
        <ShoppingCartItem item={item} />
      ))}
    </Container>
  );
}

function ShoppingCart() {
  const itemIds = useShoppingCartStore(
    useShallow((s) => s.items.map((s) => s.productId)),
  );

  return (
    <Container title={"ShoppingCart"}>
      <h3>My Shopping Cart</h3>
      {itemIds.map((itemId) => (
        <ShoppingCartItem key={itemId} itemId={itemId} />
      ))}
    </Container>
  );
}

// memo
type ShoppingCartItemProps2 = {
  itemId: string;
};
function ShoppingCartItem({ itemId }: ShoppingCartItemProps2) {
  const item = useShoppingCartStore((s) =>
    s.items.find((i) => i.productId === itemId),
  );

  if (!item) {
    return null;
  }

  const updateItemQuantity = useShoppingCartStore(
    (state) => state.updateItemQuantity,
  );

  const handleIncrease = (amount: number) => {
    updateItemQuantity(item.productId, amount);
  };
  return (
    <Container title={"Shopping Cart " + item.productId}>
      <p>{item.productId}</p>
      <p>{item.quantity}</p>
      <button onClick={() => handleIncrease(1)}>Increase</button>
      <button onClick={() => handleIncrease(-1)}>Decrease</button>
    </Container>
  );
}

// ------------------------------------------
// type ShoppingCartItemProps2 = {
//   item: IShoppingCartItem;
// };
// function ShoppingCartItem({ item }: ShoppingCartItemProps2) {
//   const updateItemQuantity = useShoppingCartStore(
//     (state) => state.updateItemQuantity,
//   );
//
//   const handleIncrease = (amount: number) => {
//     updateItemQuantity(item.productId, amount);
//   };
//   return (
//     <Container title={"Shopping Cart"}>
//       <p>{item.productId}</p>
//       <p>{item.quantity}</p>
//       <button onClick={() => handleIncrease(1)}>Increase</button>
//     </Container>
//   );
// }

type ShoppingCartItemProps = {};
