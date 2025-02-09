export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantityInStock: number;
}



export interface CartItem extends Product {
  quantity: number;
}

export interface RootState {
  cart: {
    items: CartItem[];
  };
}