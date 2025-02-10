import React from 'react';
import { useDispatch } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { addToCart } from '../store/cartSlice';
import toast from 'react-hot-toast';
import { AppDispatch } from '../store/store';
 // ✅ Import `AppDispatch`

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>(); // ✅ Use correct dispatch type

  const handleAddToCart = () => {
    dispatch(addToCart(product))
      .unwrap() // ✅ Unwrap the promise to handle errors correctly
      .then(() => {
        toast.success('Added to cart!');
      })
      .catch((error) => {
        toast.error(error || 'Failed to add to cart');
      });
  };
 // Assign a default or static image path based on product name
 const getImagePath = (productName: string) => {
  switch (productName) {
    case 'Laptop':
      return './image/lap.webp';
    
    case 'Smartphone':
      return './image/phone.webp';
    case 'Headphones':
      return '/image/head.jpg';
    default:
      return './image/logo.png'; // Default placeholder
  }
};
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
     <img
        src={getImagePath(product.name)} // Get image path based on product name
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-gray-500">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
