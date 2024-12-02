import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  productList: [],
  isLoading: false,
};

export const addProduct = createAsyncThunk(
  "/products/add",
  async (formData) => {
    const url = `${import.meta.env.VITE_API_URL}/api/admin/products/add`;
    const response = await axios.post(url, formData, {
      withCredentials: true,
    });

    if (response.status !== 200 || !response.data.success) {
      toast.error(response?.data.error || "Failed to add product");
    }
    return response?.data;
  }
);

export const getAllProducts = createAsyncThunk("/products/all", async () => {
  const url = `${import.meta.env.VITE_API_URL}/api/admin/products/all`;
  const response = await axios.get(url, {
    withCredentials: true,
  });

  if (response.status !== 200 || !response.data.success) {
    throw new Error(response?.data.error || "Failed to get products");
  }
  return response?.data;
});

export const deleteProduct = createAsyncThunk(
  "/products/delete",
  async (productId) => {
    const url = `${
      import.meta.env.VITE_API_URL
    }/api/admin/products/delete/${productId}`;
    const response = await axios.delete(url, {
      withCredentials: true,
    });

    if (response.status !== 200 || !response.data.success) {
      throw new Error(response?.data.error || "Failed to delete product");
    }

    // Return only the necessary data
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "/products/edit",
  async ({ id, formData }) => {
    const url = `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`;
    const response = await axios.put(url, formData, {
      withCredentials: true,
    });

    if (response.status !== 200 || !response.data.success) {
      throw new Error(response?.data.error || "Failed to update product");
    }
    return response?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        console.log("payload:", action.payload.data);
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        toast.error(action.payload);
      });
  },
});

export default AdminProductsSlice.reducer;
