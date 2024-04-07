import Container from "./Container.tsx";
import { memo, useCallback, useState } from "react";

type IShoppingCartItem = {
  productId: string;
  quantity: number;
};

type IShoppingCart = {
  username: string;
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

  const handleIncreaseClick = useCallback((pId: string) => {
    const copyItem = (item: IShoppingCartItem): IShoppingCartItem => {
      if (pId !== item.productId) {
        // No need to copy
        return item;
      }

      return {
        productId: item.productId,
        quantity: item.quantity + 1,
      };
    };

    setMyShoppingCart((currentCart) => {
      const newShoppingCart = {
        username: currentCart.username,
        items: [copyItem(currentCart.items[0]), copyItem(currentCart.items[1])],
      };

      return newShoppingCart;
    });
  }, []);

  return (
    <Container title={"ShoppingCart"}>
      <h3>{myShoppingCart.username}' shopping cart</h3>

      <ShoppingCartItem
        item={myShoppingCart.items[0]}
        onIncrease={handleIncreaseClick}
      />
      <ShoppingCartItem
        item={myShoppingCart.items[1]}
        onIncrease={handleIncreaseClick}
      />
    </Container>
  );
}

type ShoppingCartItemProps = {
  item: IShoppingCartItem;
  onIncrease(productId: string): void;
};

const ShoppingCartItem = memo(function ShoppingCartItem({
  item,
  onIncrease,
}: ShoppingCartItemProps) {
  return (
    <Container title={`Item ${item.productId}`}>
      <p>Product: {item.productId}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => onIncrease(item.productId)}>Increase</button>
    </Container>
  );
});
