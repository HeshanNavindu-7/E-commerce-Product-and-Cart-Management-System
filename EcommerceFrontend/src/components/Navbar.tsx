import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Home } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

export default function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

  
  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-indigo-600" />
              <span className="font-bold text-xl text-gray-900">TechShop</span>
            </Link>
          </div>
          <div className="flex items-center">
            <button onClick={handleCartClick} className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-indigo-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
