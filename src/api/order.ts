import axios from 'axios';
import { Order } from '../types';

const API_BASE_URL = 'http://localhost:5132/api/Orders';

export const placeOrder = async (): Promise<Order> => {
  const response = await axios.post<Order>(API_BASE_URL); // ✅ Ensure proper typing
  return response.data;
};
