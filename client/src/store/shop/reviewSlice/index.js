import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  reviews: [],
  isLoading: false,
};

export const addReview = createAsyncThunk(
  "/products/reviews/add",
  async (data) => {
    try {
      const url = `${
        import.meta.env.VITE_API_URL
      }/api/shop/products/reviews/add`;
      const response = await axios.post(url, data);

      if (response.status === 200 && response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
);

export const getReviews = createAsyncThunk(
  "/products/reviews/:productId",
  async (productId) => {
    try {
      const url = `${
        import.meta.env.VITE_API_URL
      }/api/shop/products/reviews/${productId}`;
      const response = await axios.get(url);

      if (response.status === 200 && response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }
);

const reviewProductSlice = createSlice({
  name: "reviewProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewProductSlice.reducer;
