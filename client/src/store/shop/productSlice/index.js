import axios from "axios";
import toast from "react-hot-toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  productDetails: null,
};

export const getAllShopProducts = createAsyncThunk(
  "/products/all",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const url = `${
      import.meta.env.VITE_API_URL
    }/api/shop/products/all?${query.toString()}`;

    const response = await axios.get(url, {
      withCredentials: true,
    });

    if (response.status !== 200 || !response.data.success) {
      throw new Error(response?.data.error || "Failed to get products");
    }
    return response?.data;
  }
);

export const getShopProductById = createAsyncThunk(
  "/products/:id",
  async (id) => {
    const url = `${import.meta.env.VITE_API_URL}/api/shop/products/${id}`;
    const response = await axios.get(url, {
      withCredentials: true,
    });

    if (response.status !== 200 || !response.data.success) {
      throw new Error(response?.data.error || "Failed to get product");
    }
    return response?.data;
  }
);

const ShopProductSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllShopProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllShopProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
        console.log("Products:", action.payload.data);
      })
      .addCase(getAllShopProducts.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.error);
      })
      .addCase(getShopProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(getShopProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
        console.error(action.error);
      });
  },
});

export const { setProductDetails } = ShopProductSlice.actions;

export default ShopProductSlice.reducer;
