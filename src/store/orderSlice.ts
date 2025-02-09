import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '../types';
import { placeOrder } from '../api/order';

interface OrderState {
  order: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  loading: false,
  error: null,
};

// ✅ Fix `createOrder` to remove `any` type
export const createOrder = createAsyncThunk<Order, void, { rejectValue: string }>(
  'order/createOrder',
  async (_, { rejectWithValue }) => {
    try {
      return await placeOrder();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to place order');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
      });
  },
});

export default orderSlice.reducer;
