import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  featureImagesList: [],
  isLoading: false,
};

export const addFeatureImage = createAsyncThunk(
  "/feature/add",
  async (image) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/common/features/add`;
      const response = await axios.post(url, { image });

      if (response.status === 200 && response.data.success) {
        toast.success("Feature Image Uploaded!");
        return response.data;
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      toast.error("Failed to upload feature image!");
      console.error(error);
    }
  }
);

export const deleteFeatureImage = createAsyncThunk(
  "/feature/delete/:id",
  async (id) => {
    try {
      const url = `${
        import.meta.env.VITE_API_URL
      }/api/common/features/delete/${id}`;
      const response = await axios.delete(url);

      if (response.status === 200 && response.data.success) {
        toast.success("Image deleted successfully!");
        return response.data;
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      toast.error("Failed to delete image!");
      console.error(error);
    }
  }
);

export const getFeatureImages = createAsyncThunk("/feature/get", async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/common/features/get`;
    const response = await axios.get(url);

    if (response.status === 200 && response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.error);
    }
  } catch (error) {
    toast.error("Failed to get images!");
    console.error(error);
  }
});

const FeatureSlice = createSlice({
  name: "feature",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImagesList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImagesList = [];
      });
  },
});

export default FeatureSlice.reducer;
