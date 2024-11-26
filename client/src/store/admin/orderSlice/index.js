import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  orderList: [],
  orderDetails: null,
  isLoading: false,
};

export const getAllOrders = createAsyncThunk("/admin/orders/all", async () => {
  try {
    const url = "http://localhost:5000/api/admin/orders/all";
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getOrderDetails = createAsyncThunk(
  "admin/orders/one",
  async (orderId) => {
    try {
      const url = `http://localhost:5000/api/admin/orders/${orderId}`;
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/orders/update",
  async ({ orderId, orderStatus }) => {
    try {
      const url = `http://localhost:5000/api/admin/orders/update/${orderId}`;
      const response = await axios.put(url, { orderStatus });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orderList = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        toast.error("Failed to get orders!");
        console.error(action.error);
        state.isLoading = false;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.orderDetails = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        toast.error("Failed to get order details!");
        console.error(action.error);
        state.isLoading = false;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state) => {
        toast.success("Order status updated successfully!");
        state.isLoading = false;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        toast.error("Failed to update order status!");
        console.error(action.error);
        state.isLoading = false;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
