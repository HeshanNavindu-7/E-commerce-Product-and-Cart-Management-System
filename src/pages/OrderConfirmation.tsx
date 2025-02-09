import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import { AppDispatch } from '../store/store';
import { createOrder } from '../store/orderSlice';

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      // Dispatch the order creation action
      await dispatch(createOrder()).unwrap();
      
      // Display success message
      toast.success('Order placed successfully!');
      
      // Navigate to the order confirmation page
      navigate('/order-confirmation');
    } catch (error: unknown) {
      // Log the error for debugging purposes
      console.error('Order placement error:', error);
      
      // Display error message and navigate to the shipping page
      toast.error('Failed to place order. Please complete your shipping details.');
      navigate('/cart');
    }
  };

  return (
    <div className="mt-6 border-t pt-6">
      {/* Render the place order button */}
      <button
        onClick={handlePlaceOrder}
        className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Place Order
      </button>
    </div>
  );
}
