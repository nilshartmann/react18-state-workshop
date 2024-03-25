import Container from "./Container.tsx";

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
    </Container>
  );
}

type ShoppingCartItemProps = {};

function ShoppingCartItem({}: ShoppingCartItemProps) {
  let item: any;

  const handleIncrease = (amount: number) => {
    // todo
  };

  if (!item) {
    return <h1>Item not found</h1>;
  }

  return (
    <Container title={`Item ${item.productId}`}>
      <p>
        Product-Id ({item.productId})
      </p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => handleIncrease(-1)}>Decrease</button>
      <button onClick={() => handleIncrease(+1)}>Increase</button>
    </Container>
  );
}
