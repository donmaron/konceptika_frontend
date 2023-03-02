import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from ".";
import axiosInstance from "../axiosInstance";
import axios from "axios";

interface Product {
  uuid: string;
  name: string;
  price: number;
  category_id: number;
}

interface ProductsState {
  loading: boolean;
  error: string | null;
  data: Product[];
}

const initialState: ProductsState = {
  loading: false,
  error: null,
  data: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
      console.log(action.payload)
    },
    getProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getProductsStart, getProductsSuccess, getProductsFailure } = productsSlice.actions;

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  dispatch(getProductsStart());
  try {
    const response = await axiosInstance.get("/products");
    dispatch(getProductsSuccess(response.data.data));
  } catch (error: any) {
    dispatch(getProductsFailure(error.message));
  }
};

export const selectProductsLoading = (state: { products: ProductsState }) => state.products.loading;
export const selectProductsError = (state: { products: ProductsState }) => state.products.error;
export const selectProducts = (state: { products: ProductsState }) => state.products.data;

export default productsSlice.reducer;
