import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const searchProduct = createAsyncThunk(
  "products/search",
  async (keyword) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/products/search/${keyword}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const searchProductSlice = createSlice({
  name: "searchProduct",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Add your reducers here
      .addCase(searchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.searchResults = [];
        console.error(action.error);
      });
  },
});

export const { clearSearchResults } = searchProductSlice.actions;

export default searchProductSlice.reducer;
