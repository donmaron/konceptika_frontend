import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from ".";
import axios from "axios";
import axiosInstance from "../axiosInstance";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export const login =
  (data: { email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        "http://km-rekrutacja.atwebpages.com/api/login",
        data
      );
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      dispatch(loginSuccess(response.data.user));
    } catch (error) {
      console.error(error);
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await axiosInstance.post("/logout")
    if (typeof localStorage !== 'undefined') {;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    dispatch(logoutSuccess());
  } catch (error) {
    console.error(error);
  }
};

export const checkLoggedIn = () => async (dispatch: AppDispatch) => {
  try {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token") || "")
        : "";
      if (token) {
        const response = await axiosInstance.get("/me");
        dispatch(loginSuccess(response.data.user));
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;
