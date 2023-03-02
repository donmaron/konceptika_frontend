import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { useDispatch } from "react-redux";
import productsReducer from "./productsSlice";
import authReducer from "./authSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
