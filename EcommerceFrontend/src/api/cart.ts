import axios from 'axios';
import { CartItem } from '../types';

const API_BASE_URL = 'http://localhost:5132/api/Cart';

// Fetch all cart items
export const fetchCartItems = async (): Promise<CartItem[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

// Add an item to the cart
export const addCartItem = async (cartItem: Omit<CartItem, 'id'>): Promise<CartItem> => {
  const response = await axios.post(API_BASE_URL, cartItem);
  return response.data;
};

// Update quantity of a cart item
export const updateCartItemQuantity = async (
  cartItemId: number,
  newQuantity: number
): Promise<CartItem> => {
  const response = await axios.put(`${API_BASE_URL}/update-quantity/${cartItemId}`, null, {
    params: { newQuantity },
  });
  return response.data;
};

// Remove an item from the cart
export const removeCartItem = async (cartItemId: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${cartItemId}`);
};
