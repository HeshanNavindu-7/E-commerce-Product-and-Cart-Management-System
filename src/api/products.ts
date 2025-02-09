import axios from 'axios';
import { Product } from '../types';

const API_BASE_URL = 'http://localhost:5132/api'; // Adjust to your backend URL

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get(`${API_BASE_URL}/Products`);
    return response.data;
};

export const addProduct = async (product: Product): Promise<Product> => {
    const response = await axios.post(`${API_BASE_URL}/Products`, product);
    return response.data;
};

export const updateProduct = async (id: number, product: Product): Promise<Product> => {
    const response = await axios.put(`${API_BASE_URL}/Products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/Products/${id}`);
};
