import Container from "./Container.tsx";
import { useAppStore } from "./stores/appStore.ts";
import { IProduct } from "./shopping-cart.types.ts";
import { useShallow } from "zustand/react/shallow";

export default function ShoppingCartApp() {
  return (
    <Container title={"ShoppingCartApp"}>
      <div className={"SameSizeFlex"}>
        <ProductList />
        <ShoppingCart />
      </div>
    </Container>
  );
}

function ShoppingCart() {
  // Annahme: jedes Produkt ist max. einmal im Warenkorn
  //  Ansonsten brauchen wir an jeder Cart eine ID, was in Realität auch typsich sein dürfte
  const productIds = useAppStore(
    useShallow((s) => s.items.map((i) => i.productId)),
  );

  return (
    <Container title={"ShoppingCart"}>
      <h3>My Shopping Cart</h3>
      {productIds.length === 0 && <b>No products in cart yet</b>}

      {productIds.map((pId) => (
        <ShoppingCartItem key={pId} productId={pId} />
      ))}
    </Container>
  );
}

type ShoppingCartItemProps = {
  productId: string;
};

function ShoppingCartItem({ productId }: ShoppingCartItemProps) {
  const item = useAppStore((state) =>
    state.items.find((i) => i.productId === productId),
  );
  const productName = useAppStore(
    (s) =>
      s.products.find((p) => p.id === productId)?.label || "unknown product",
  );
  const updateItemQuantity = useAppStore((state) => state.updateItemQuantity);

  const handleIncrease = (amount: number) => {
    updateItemQuantity(productId, amount);
  };

  if (!item) {
    return <h1>Item for {productId} not found</h1>;
  }

  return (
    <Container title={`Item ${item.productId}`}>
      <p>
        Product: {productName} ({item.productId})
      </p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => handleIncrease(-1)}>Decrease</button>
      <button onClick={() => handleIncrease(+1)}>Increase</button>
    </Container>
  );
}

function ProductList() {
  const products = useAppStore((s) => s.products);

  return (
    <Container title={"ProductList"}>
      {products.map((p) => (
        <Product key={p.id} product={p} />
      ))}
    </Container>
  );
}

type ProductProps = {
  product: IProduct;
};
function Product({ product }: ProductProps) {
  const increasePrice = useAppStore((s) => s.increasePrice);
  const addToCart = useAppStore((s) => s.addItem);

  const handleIncreasePrice = () => {
    increasePrice(product.id, 0.5);
  };

  const handleAddToCart = () => addToCart(product.id);

  return (
    <Container title={`Product ${product.id}`}>
      <h3>{product.label}</h3>
      <p>{product.price} EUR</p>
      <button onClick={handleIncreasePrice}>Increase Price</button>
      <button onClick={handleAddToCart}>Add to cart</button>
    </Container>
  );
}
