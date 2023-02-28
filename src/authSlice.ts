import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./index";
import axios from "axios";

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

export const login = (data: { email: string; password: string }) => async (
  dispatch: AppDispatch
) => {
  try {
    const response = await axios.post("/api/login", data);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await axios.post("/api/logout");
    dispatch(logoutSuccess());
  } catch (error) {
    console.error(error);
  }
};

export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;
