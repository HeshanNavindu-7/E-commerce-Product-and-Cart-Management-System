import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CartItem, Product, AddCartItemRequest } from '../types';
import { addCartItem, updateCartItemQuantity, removeCartItem, fetchCartItems } from '../api/cart';

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

// Load  Items from Backend
export const loadCart = createAsyncThunk('cart/loadCart', async (_, { rejectWithValue }) => {
  try {
    return await fetchCartItems();
  } catch (error: unknown) {
    return rejectWithValue((error as Error).message || 'Failed to load cart');
  }
});

// Add Item to Cart
export const addToCart = createAsyncThunk('cart/addToCart', async (product: Product, { rejectWithValue }) => {
  try {
    const cartItem: AddCartItemRequest = {
      productId: product.id, 
      productName: product.name,
      price: product.price,
      quantity: 1, // Default 
    };
    return await addCartItem(cartItem);
  } catch (error: unknown) {
    return rejectWithValue((error as Error).message || 'Failed to add to cart');
  }
});

// Update Item Quantity in Cart
export const updateQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ id, newQuantity }: { id: number; newQuantity: number }, { rejectWithValue }) => {
    try {
      return await updateCartItemQuantity(id, newQuantity);
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message || 'Failed to update quantity');
    }
  }
);

// Remove Item from Cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (id: number, { rejectWithValue }) => {
  try {
    await removeCartItem(id);
    return id; 
  } catch (error: unknown) {
    return rejectWithValue((error as Error).message || 'Failed to remove from cart');
  }
});

// Redux Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load Cart
      .addCase(loadCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add Item to Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Update Quantity
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Remove Item from Cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
