import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createOrder = createAsyncThunk(
  "/orders/create",
  async (orderData) => {
    try {
      const url = "http://localhost:5000/api/shop/orders/create";
      const response = await axios.post(url, orderData);

      toast.success("Order Created!");

      return response.data;
    } catch (error) {
      toast.error("Failed to create order");
      throw error;
    }
  }
);

export const capturePayment = createAsyncThunk(
  "/orders/capture",
  async ({ paymentId, payerId, orderId }) => {
    try {
      const url = "http://localhost:5000/api/shop/orders/capture";
      const response = await axios.post(url, { paymentId, payerId, orderId });

      toast.success("Payment Confirmed!");

      return response.data;
    } catch (error) {
      toast.error("Failed to capture payment");
      throw error;
    }
  }
);

export const getAllOrdersByUser = createAsyncThunk(
  "/orders/all",
  async (userId) => {
    try {
      const url = `http://localhost:5000/api/shop/orders/all/${userId}`;
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "/orders/:id",
  async (orderId) => {
    try {
      const url = `http://localhost:5000/api/shop/orders/${orderId}`;
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const shopOrderSlice = createSlice({
  name: "shopOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;

        sessionStorage.setItem(
          "CurrentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderId = null;
        state.approvalURL = null;
      })
      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shopOrderSlice.actions;
export default shopOrderSlice.reducer;
