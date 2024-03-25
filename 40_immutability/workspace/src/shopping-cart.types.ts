export type ShoppingCartItem = {
  productId: string;
  quantity: number;
};

export type ShoppingCart = {
  username: string;
  items: ShoppingCartItem[];
};
