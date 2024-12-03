import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const IniState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_API_URL}/api/auth/register`;

    try {
      const response = await axios.post(url, formData, {
        withCredentials: true,
      });

      if (response.status !== 200 || !response.data.success) {
        throw new Error(response.data.error || "Could not register user");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_API_URL}/api/auth/login`;

    try {
      const response = await axios.post(url, formData, {
        withCredentials: true,
      });

      if (response.status !== 200 || !response.data.success) {
        throw new Error(response.data.error || "Could not register user");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const checkAuth = createAsyncThunk("/auth/check-auth", async (token) => {
  const url = `${import.meta.env.VITE_API_URL}/api/auth/check-auth`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });

    if (response.status !== 200 || !response.data.success) {
      throw new Error(response.data.error || "Could not register user");
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || error.message);
  }
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const url = `${import.meta.env.VITE_API_URL}/api/auth/logout`;

  try {
    const response = await axios.post(
      url,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200 || !response.data.success) {
      throw new Error(response.data.error || "Could not logout user");
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: IniState,
  reducers: {
    setUser: (state, action) => {},
    resetTokenAndCredentials: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true; // Adjust based on your logic
        state.user = action.payload.user;
        toast.success(action.payload.message);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        toast.error(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        sessionStorage.setItem("token", JSON.stringify(action.payload.token));
        console.log(action.payload.user);
        toast.success(action.payload.message);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        toast.error(action.payload);
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        toast.success(action.payload.message);
      });
  },
});

export const { setUser, resetTokenAndCredentials } = authSlice.actions;
export default authSlice.reducer;
