import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import axios from "axios";
import axiosInstance from "./axiosInstance";
import { useState } from 'react';

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
      console.log(action.payload);
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export const login = (data: { email: string; password: string }) => async (
  dispatch: AppDispatch
) => {
  try {
    const response = await axios.post("http://localhost:8000/api/login", data);
    localStorage.setItem('token', JSON.stringify(response.data.token));
    localStorage.setItem('user', JSON.stringify(response.data.user));
    dispatch(loginSuccess(response.data.user));
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await axiosInstance.post("/logout");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutSuccess());
  } catch (error) {
    console.error(error);
  }
};

// export const checkLoggedIn = () => async (dispatch: AppDispatch) => {
//   try {
//     const user = JSON.parse(localStorage.getItem('user') || '');
//     if (user) {
//       dispatch(loginSuccess(user));
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const checkLoggedIn = () => async (
//   dispatch: AppDispatch
// ) => {
//   try {
//     const response = await axiosInstance.get("/me");
//     dispatch(loginSuccess(response.data.user));
//   } catch (error) {
//     console.error(error);
//   }
// };

export const checkLoggedIn = () => async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') || '') : '';
    if (token) {
      const response = await axiosInstance.get("/me");
      dispatch(loginSuccess(response.data.user));
    }
  } catch (error) {
    console.error(error);
  }
};

export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;