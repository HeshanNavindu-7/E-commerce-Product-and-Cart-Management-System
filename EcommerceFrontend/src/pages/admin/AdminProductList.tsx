import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../../api/products';
import { Product } from '../../types';
import ProductForm from '../../components/admin/ProductForm';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';

const AdminProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Function to fetch products from the backend
    const loadProducts = async () => {
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Error fetching products.');
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // Handle edit action
    const handleEdit = (product: Product) => {
        setEditingProduct(product);
    };

    // Handle delete action
    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (!confirmDelete) return;

        try {
            await deleteProduct(id);
            alert('Product deleted successfully!');
            loadProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product.');
        }
    };

    // Handle save action from the form
    const handleSave = () => {
        loadProducts(); // Reload the product list after saving
        setEditingProduct(null); // Clear the form
    };

    return (
        <div>
            <Typography variant="h4" component="h1" gutterBottom>
                Manage Products
            </Typography>
            <ProductForm product={editingProduct} onSave={handleSave} />
            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Price</strong></TableCell>
                            <TableCell><strong>Description</strong></TableCell>
                            <TableCell><strong>Quantity in Stock</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleEdit(product)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AdminProductList;
