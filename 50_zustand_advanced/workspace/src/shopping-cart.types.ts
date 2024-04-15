export type IShoppingCartItem = {
  // Annahme: Product-Id ist eindeutig in der Shopping Cart
  productId: string;
  quantity: number;
};

export type IShoppingCart = {
  items: IShoppingCartItem[];
};

export type IProduct = {
  id: string;
  label: string;
  price: number;
  // In der Produkt-Liste soll angezeigt werden, ob sich ein
  // Produkt bereits im Warenkorb befindet
  // Filter => Produkte im Warenkorb nicht anzeigen
};
