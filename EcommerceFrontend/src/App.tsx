import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';
import AdminDashboard from './pages/admin/AdminDashboard';
import WeatherForecast from './components/WeatherForecast';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/weatherForecast" element={<WeatherForecast />} />
          </Routes>
          <Toaster position="bottom-right" />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;