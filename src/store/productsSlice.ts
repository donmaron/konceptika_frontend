import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
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
    },
    getProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
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
    const response = await axios.get("/api/products");
    dispatch(getProductsSuccess(response.data));
  } catch (error) {
    dispatch(getProductsFailure(error.message));
  }
};

export const selectProductsLoading = (state: { products: ProductsState }) => state.products.loading;
export const selectProductsError = (state: { products: ProductsState }) => state.products.error;
export const selectProducts = (state: { products: ProductsState }) => state.products.data;

export default productsSlice.reducer;
