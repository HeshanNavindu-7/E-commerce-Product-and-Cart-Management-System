export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantityInStock: number;
}

export interface CartItem {
  id: number;
  productId: number; 
  productName: string;
  price: number;
  quantity: number;
}

//  Create a new type for adding items to the cart
export type AddCartItemRequest = Omit<CartItem, 'id'>;



export interface RootState {
  cart: {
    items: CartItem[];
  };
}

export interface Order {
  id: number;
  orderDate: string; 
  items: CartItem[]; 
  totalPrice: number;
}
export interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}