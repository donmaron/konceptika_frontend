import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { useDispatch } from "react-redux";
import counterReducer from "../counterSlice";
import productsReducer from "./productsSlice";
import authReducer from "../authSlice";
import { counterSaga } from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    products: productsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(counterSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
