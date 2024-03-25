export type IShoppingCartItem = {
  productId: string;
  quantity: number;
};

export type IShoppingCart = {
  username: string;
  items: IShoppingCartItem[];
};
