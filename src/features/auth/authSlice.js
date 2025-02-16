import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const API_URL = "http://localhost:5000/auth"; // Update with your backend URL
const cookies = new Cookies();
const token = cookies.get("Token");

console.log(token)

// Async Thunk: Login (Request OTP)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      return response.data; // Expecting { message: "OTP sent to your email" }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Async Thunk: Verify OTP
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/verify-otp-login`, {
        email,
        otp,
      });
      cookies.set("Token", response.data.token, { path: "/" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "OTP verification failed");
    }
  }
);

// Async Thunk: Fetch Logged-in User Data
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user data"
      );
    }
  }
);

// Async Thunk: update User Data
export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/auth/profile", // Ensure this endpoint is correct
        userData,
        {
          headers: { Authorization: `Bearer ${token}` }, // Pass token for auth
          "Content-Type": "application/json",
        }
      );
      return response.data; // Return updated user data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update user data"
      );
    }
  }
);

// add img to user information
export const imageAdd = createAsyncThunk(
  "auth/imageAdd",
  async (img, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/auth/edit-image",
        { img }, // Make sure the key matches what the backend expects
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// reset password
export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data, rejectWithValue) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/reset-password",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      cookies.set("Token", response.data.token, { path: "/" });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk: send email for Forgot Password
export const sendEmail = createAsyncThunk(
  "auth/forgot_password",
  async (email, rejectWithValue) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/sendemail-forgotpassword`,
        email,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk: adding new password through email
export const newPassword = createAsyncThunk(
  "auth/newPassword",
  async ({ id, token, newPassword }, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/forgot-password/${id}/${token}`,
        { newPassword },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async Thunk: Logout User
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await axios.delete(`${API_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    cookies.remove("Token");
    return response.data;
    // return null;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  user: null,
  token: cookies.get("Token") || null,
  isLoading: false,
  error: null,
  otpSent: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.otpSent = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // verifyOTP while login
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.userData;
        state.token = action.payload.token;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // get user information
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // update user
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload; // Update user with new data
        state.isLoading = false;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
      })

      // add image to the user
      .addCase(imageAdd.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })

      // resetPassword
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Update user with new data
      })

      // sendEmail for forgot password reset
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })

      // newPassword
      .addCase(newPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Update user with new data
      })

      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
