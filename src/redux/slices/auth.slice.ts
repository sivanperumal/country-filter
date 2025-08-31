import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import type { AuthState } from "../../interface";
import type { RootState } from "../store";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formdata: { username: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        ...formdata,
      });
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      return res.data;
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const fetchLoginUser = createAsyncThunk(
  "auth/fetchLoginUser",
  async (_, thunkAPI) => {
    //const state = store.getState();
    const token = localStorage.getItem("accessToken");
    try {
      const res = await axios.get("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    const refreshtoken = localStorage.getItem("refreshToken");
    try {
      const response = await axios.post("https://dummyjson.com/auth/refresh", {
        refreshToken: refreshtoken,
      });
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchTokensFromStorage: (state) => {
      state.accessToken = localStorage.getItem("accessToken");
      state.refreshToken = localStorage.getItem("refreshToken");
    },
    userLogout: (state) => {
      state.user = null;
      state.accessToken = "";
      state.refreshToken = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        localStorage.setItem("accessToken", action.payload.accessToken);
        state.error = null;
        state.loading = false;
      });
  },
});

export const { fetchTokensFromStorage, userLogout } = authSlice.actions;
export default authSlice.reducer;

export const useUsers = () => {
  const userObj = useSelector((state: RootState) => {
    return state.auth;
  });
  return { ...userObj };
};
