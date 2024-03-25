import Container from "./Container.tsx";
import {useAppStore} from "../../material/20_solutions/10_two_stores/stores/appStore.ts";
import {useShallow} from "zustand/react/shallow";
import {useShoppingCartStore} from "./stores/shoppingCartSlice.ts";

export default function ShoppingCartApp() {
  return (
    <Container title={"ShoppingCartApp"}>
      <div className={"SameSizeFlex"}>
        <ShoppingCart />
      </div>
    </Container>
  );
}

function ShoppingCart() {
  // Annahme: jedes Produkt ist max. einmal im Warenkorn
  //  Ansonsten brauchen wir an jeder Cart eine ID, was in Realität auch typsich sein dürfte
  const productIds = useShoppingCartStore(
    useShallow((s) => s.items.map((i) => i.productId)),
  );

  return (
    <Container title={"ShoppingCart"}>
      <h3>My Shopping Cart</h3>
      {/*

      TODO:
      - zeige eine Liste aller Items aus der ShoppingCart an
      - ein einzelnes Item soll mit der Komponente "ShoppingCartItem" angezeigt werden
      - überlege dir, welche Informationen du wo aus dem Store ausliest und wie die API (Properties)
          der ShoppingCartItem-Komponente aussieht

      */}

      {productIds.map((pId) => (
        <ShoppingCartItem key={pId} productId={pId} />
      ))}
    </Container>
  );

}

type ShoppingCartItemProps = {
  productId: string
};

function ShoppingCartItem({productId}: ShoppingCartItemProps) {
  const item = useShoppingCartStore((state) =>
    state.items.find((i) => i.productId === productId),
  );

  const updateItemQuantity = useShoppingCartStore((state) => state.updateItemQuantity);

  const handleIncrease = (amount: number) => {
    updateItemQuantity(productId, amount);
  };

  if (!item) {
    return <h1>Item not found</h1>;
  }



  return (
    <Container title={`Item ${item.productId}`}>
      <p>
        Product-Id: ({item.productId})
      </p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => handleIncrease(-1)}>Decrease</button>
      <button onClick={() => handleIncrease(+1)}>Increase</button>
    </Container>
  );
}


