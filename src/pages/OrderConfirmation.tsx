import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      <h1 className="mt-4 text-3xl font-bold text-gray-900">
        Order Confirmed!
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        Thank you for your purchase. Your order has been received.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
      >
        Continue Shopping
      </button>
    </div>
  );
}
