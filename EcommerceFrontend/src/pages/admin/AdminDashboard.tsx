import React from 'react';
import AdminProductList from './AdminProductList';

const AdminDashboard = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
            <AdminProductList />
        </div>
    );
};

export default AdminDashboard;
