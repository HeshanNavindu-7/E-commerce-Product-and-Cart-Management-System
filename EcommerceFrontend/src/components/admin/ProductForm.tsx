import React, { useEffect, useState } from 'react';
import { Product } from '../../types';
import { addProduct, updateProduct } from '../../api/products';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

interface ProductFormProps {
    product?: Product | null;
    onSave: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave }) => {
    const [formData, setFormData] = useState<Product>({
        id: 0,
        name: '',
        price: 0,
        description: '',
        quantityInStock: 0,
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'price' || name === 'quantityInStock' ? Number(value) : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (formData.id === 0) {
                await addProduct(formData);
                alert('Product added successfully!');
            } else {
                await updateProduct(formData.id, formData);
                alert('Product updated successfully!');
            }
            onSave();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Error saving product.');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '600px', margin: '0 auto' }}>
            <Typography variant="h5" component="h2" gutterBottom>
                {formData.id === 0 ? 'Add Product' : 'Edit Product'}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        multiline
                        rows={4}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Quantity in Stock"
                        name="quantityInStock"
                        value={formData.quantityInStock}
                        onChange={handleChange}
                        required
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ textTransform: 'none', padding: '10px 0' }}
                    >
                        Save Product
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductForm;
