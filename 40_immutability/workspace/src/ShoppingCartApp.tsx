import Container from "./Container.tsx";
import { useState } from "react";
import { IShoppingCart, IShoppingCartItem } from "./shopping-cart.types.ts";

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

  const handleIncreaseClick = (pId: string) => {
    const copyItem = (item: IShoppingCartItem): IShoppingCartItem => {
      return {
        productId: item.productId,
        quantity: item.productId === pId ? item.quantity + 1 : item.quantity,
      };
    };

    const newShoppingCart = {
      username: myShoppingCart.username,
      items: [
        copyItem(myShoppingCart.items[0]),
        copyItem(myShoppingCart.items[1]),
      ],
    };

    setMyShoppingCart(newShoppingCart);
  };

  return (
    <Container title={"ShoppingCart"}>
      <button
        onClick={() => handleIncreaseClick(myShoppingCart.items[0].productId)}
      >
        Increase Item 0
      </button>
      <button
        onClick={() => handleIncreaseClick(myShoppingCart.items[1].productId)}
      >
        Increase Item 1
      </button>

      <h3>{myShoppingCart.username}' shopping cart</h3>

      <ShoppingCartItem item={myShoppingCart.items[0]} />
      <ShoppingCartItem item={myShoppingCart.items[1]} />
    </Container>
  );
}

type ShoppingCartItemProps = {
  item: IShoppingCartItem;
};

function ShoppingCartItem({ item }: ShoppingCartItemProps) {
  return (
    <Container title={`Item ${item.productId}`}>
      <p>Product: {item.productId}</p>
      <p>Quantity: {item.quantity}</p>
    </Container>
  );
}
