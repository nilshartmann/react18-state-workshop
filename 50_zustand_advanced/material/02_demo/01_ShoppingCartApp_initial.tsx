import Container from "./Container.tsx";
import { useState } from "react";

export type IShoppingCartItem = {
	productId: string;
	quantity: number;
};

export type IShoppingCart = {
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

	const handleIncreaseClick = (pId: string) => {
		const itemIx = myShoppingCart.items.findIndex(
			(item) => item.productId === pId,
		);
		myShoppingCart.items[itemIx].quantity =
			myShoppingCart.items[itemIx].quantity + 1;
		setMyShoppingCart(myShoppingCart);

		console.log("New Shopping Cart", myShoppingCart);
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
