import axios from 'axios';
import { Product } from '../types';

const API_BASE_URL = 'http://localhost:5132/api'; // Adjust this to match your .NET backend URL

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
