import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addAddress = createAsyncThunk("/address/add", async (formData) => {
  try {
    const url = `http://localhost:5000/api/shop/address/add`;
    const response = await axios.post(url, formData, {
      withCredentials: true,
    });

    toast.success("Address added successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to add address");
    console.log(error);
  }
});

export const getAddresses = createAsyncThunk("/address/all", async (userId) => {
  try {
    const url = `http://localhost:5000/api/shop/address/all/${userId}`;
    const response = await axios.get(url, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    toast.error("Failed to get addresses");
    console.error(error);
  }
});

export const deleteAddress = createAsyncThunk(
  "/address/delete",
  async ({ userId, addressId }) => {
    try {
      const url = `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`;
      const response = await axios.delete(url, {
        withCredentials: true,
      });

      toast.success("Address deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete address");
      console.error(error);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "/address/update",
  async ({ formData, userId, addressId }) => {
    try {
      const url = `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`;
      const response = await axios.put(url, formData, {
        withCredentials: true,
      });

      toast.success("Address updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update address");
      console.error(error);
    }
  }
);

const AddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoading = false;
        console.error(action.error);
      })
      .addCase(getAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(getAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];
        console.error(action.error);
      });
  },
});

export default AddressSlice.reducer;
