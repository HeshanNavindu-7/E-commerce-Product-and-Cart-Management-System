export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantityInStock: number;
}

export interface CartItem {
  id: number;
  productId: number; // ✅ Ensure this is included
  productName: string;
  price: number;
  quantity: number;
}

// ✅ Create a new type for adding items to the cart
export type AddCartItemRequest = Omit<CartItem, 'id'>;



export interface RootState {
  cart: {
    items: CartItem[];
  };
}