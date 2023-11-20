import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  tokenExpirationTime: string | null;
  isRegistered: boolean;
  username: string | null;
  isLoading: boolean;
  error: string | undefined | null;
}

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
  tokenExpirationTime: null,
  isRegistered: false,
  username: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "customer/login",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await axios.post(
      "https://starbucks.pythonanywhere.com/login",
      {
        username,
        password,
      }
    );
    return response.data;
  }
);

export const register = createAsyncThunk(
  "customer/register",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await axios.post(
      "https://starbucks.pythonanywhere.com/register",
      {
        username,
        password,
      }
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.tokenExpirationTime = null;
      state.username = null;
      state.isRegistered = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.tokenExpirationTime = action.payload.expirationTime;
        // state.username = action.payload.username;
        state.username = action.meta.arg.username;
        console.log("username", state.username);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRegistered = true;
        // state.username = action.payload.username;
        state.username = action.meta.arg.username;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
