import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

// const API_URL = "http://localhost:5001/auth";
const API_URL = "https://task-management-server-pmpg.vercel.app/auth";

// Async Thunk: Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data; // Expecting { message: "User registerUserUsered successfully" }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to registerUser user "
      );
    }
  }
);

// Async Thunk: Verify OTP
export const verifyOTP = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp, name, userName, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, {
        email,
        otp,
        name,
        userName,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to verify OTP"
      );
    }
  }
);

// Async Thunk: login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    const cookies = new Cookies();
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      cookies.set("Token", response.data.token, { path: "/" });
      thunkAPI.dispatch(fetchUserData()); // Fetch user data after setting the token
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to Login user data"
      );
    }
  }
);

// Async Thunk: get User Data
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("Token");

    if (!token) {
      window.location.href = "/login";
      return thunkAPI.rejectWithValue("Token is missing");
    }

    try {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Async Thunk: update User Data
export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async (userData, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("Token");

    try {
      const response = await axios.put(`${API_URL}/profile`, userData, {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to update user data"
      );
    }
  }
);

// Async Thunk: Image add
export const imageAdd = createAsyncThunk(
  "auth/imageAdd",
  async (img, { rejectWithValue }) => {
    const cookies = new Cookies();
    const token = cookies.get("Token");
    try {
      const response = await axios.put(
        `${API_URL}/edit-image`,
        { img }, // Make sure the key matches what the backend expects
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk: reset password
export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data, rejectWithValue) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
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
        `${API_URL}/sendemail-forgotpassword`,
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
        `${API_URL}/forgot-password/${id}/${token}`,
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
  const cookies = new Cookies();
  const token = cookies.get("Token");
  try {
    const response = await axios.delete(`${API_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (token) {
      cookies.remove("Token", { path: "/" });
    }
    return response?.data || {};
    // return null;
  } catch (error) {
    console.log(error);
  }
});

const cookies = new Cookies();
const token = cookies.get("Token");

const initialState = {
  user: null,
  authToken: cookies.get("Token") || null,
  isLoading: false,
  error: null,
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

      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isVerified = true;
        state.user = action.payload;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // get user information
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })

      // get user information
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      // get user information
      .addCase(fetchUserData.rejected, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })

      // update user
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload; // Update user with new data
        state.isLoading = false;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
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
