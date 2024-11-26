import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "/cart/add",
  async ({ userId, productId, quantity }) => {
    try {
      const url = "http://localhost:5000/api/shop/cart/add";
      const response = await axios.post(url, {
        userId,
        productId,
        quantity,
      });

      return response.data;
    } catch (error) {
      toast.error("Failed to add product to cart!");
      console.error(error);
    }
  }
);

export const fetchCartItems = createAsyncThunk("/cart/get", async (userId) => {
  try {
    const url = `http://localhost:5000/api/shop/cart/get/${userId}`;
    const response = await axios.get(url, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const removeFromCart = createAsyncThunk(
  "/cart/delete",
  async ({ userId, productId }) => {
    try {
      const url = `http://localhost:5000/api/shop/cart/delete/${userId}/${productId}`;
      const response = await axios.delete(url, {
        withCredentials: true,
      });

      toast.success("Product removed from cart!");

      return response.data;
    } catch (error) {
      toast.error("Failed to remove product from cart!");
      console.error(error);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "/cart/update",
  async ({ userId, productId, quantity }) => {
    try {
      const url = "http://localhost:5000/api/shop/cart/update";
      const response = await axios.put(url, {
        userId,
        productId,
        quantity,
      });

      return response.data;
    } catch (error) {
      toast.error("Failed to update cart!");
      console.error(error);
    }
  }
);

const ShopCartSlice = createSlice({
  name: "shopCart",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
        console.error(action.error);
        toast.error(action.payload);
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
        console.error(action.error);
        toast.error(action.payload);
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
        console.error(action.error);
        toast.error(action.payload);
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
        console.error(action.error);
        toast.error(action.payload);
      });
  },
});

export default ShopCartSlice.reducer;
