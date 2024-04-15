import Container from "./Container.tsx";
import { memo, useCallback, useState } from "react";
import { updateShoppingCart } from "./updateShoppingCart.ts";
import { produce } from "immer";
import { useImmer } from "use-immer";

type IShoppingCartItem = {
  productId: string;
  quantity: number;
};

type IShoppingCart = {
  username?: string;
  items: IShoppingCartItem[];
};

function createCart(): IShoppingCart {
  return {
    username: "Klaus",
    items: [
      { productId: "P1", quantity: 2 },
      { productId: "P2", quantity: 1 },
    ],
  };
}

export default function ShoppingCartApp() {
  const [myShoppingCart, setMyShoppingCart] = useState(createCart);

  // Mit "useImmer":
  // const [myShoppingCart, setMyShoppingCart] = useImmer(createCart);
  // setMyShoppingCart((draft) => {
  //   const itemIx = draft.items.findIndex((item) => item.productId === pId);
  //   draft.items[itemIx].quantity = draft.items[itemIx].quantity + 1;
  //   // myShoppingCart.username = "..."
  //   draft.username = "...";
  //   delete draft.username;
  // })

  const handleIncreaseClick = useCallback((pId: string) => {
    setMyShoppingCart((currentShoppingCart) => {
      const itemIx = currentShoppingCart.items.findIndex(
        (item) => item.productId === pId,
      );

      function increaseQuantity(item: IShoppingCartItem) {
        if (item.productId === pId) {
          const newItem = { ...item };
          newItem.quantity = newItem.quantity + 1;
          return newItem;
        }

        return item;
      }

      // NICHT MACHEN!!!!!
      // myShoppingCart.items[itemIx].quantity =
      //   myShoppingCart.items[itemIx].quantity + 1;

      const newMyShoppingCart = {
        ...currentShoppingCart,
        items: currentShoppingCart.items.map((item) => increaseQuantity(item)),
      };

      console.log("New Shopping Cart", newMyShoppingCart);
      return newMyShoppingCart;
    });
  }, []);

  const handleIncreaseClickMitImmer = (pId: string) => {
    const newShoppingCart = produce(myShoppingCart, (draft) => {
      const itemIx = draft.items.findIndex((item) => item.productId === pId);
      draft.items[itemIx].quantity = draft.items[itemIx].quantity + 1;
      // myShoppingCart.username = "..."
      draft.username = "...";
      delete draft.username;
    });
    setMyShoppingCart(newShoppingCart);
  };

  return (
    <Container title={"ShoppingCart"}>
      <button
        onClick={() =>
          handleIncreaseClickMitImmer(myShoppingCart.items[0].productId)
        }
      >
        Increase Item 1
      </button>
      <button
        onClick={() =>
          handleIncreaseClickMitImmer(myShoppingCart.items[1].productId)
        }
      >
        Increase Item 2
      </button>

      <h3>{myShoppingCart.username}' shopping cart</h3>

      <ShoppingCartItem
        item={myShoppingCart.items[0]}
        onIncreaseClick={handleIncreaseClick}
      />
      <ShoppingCartItem
        item={myShoppingCart.items[1]}
        onIncreaseClick={handleIncreaseClick}
      />
    </Container>
  );
}

type ShoppingCartItemProps = {
  item: IShoppingCartItem;
  onIncreaseClick: (itemId: string) => void;
};

const ShoppingCartItem = memo(function ShoppingCartItem({
  onIncreaseClick,
  item,
}: ShoppingCartItemProps) {
  return (
    <Container title={`Item ${item.productId}`}>
      <p>Product: {item.productId}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => onIncreaseClick(item.productId)}>Increase!</button>
    </Container>
  );
});
