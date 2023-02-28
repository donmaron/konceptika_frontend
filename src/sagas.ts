import { put, takeLatest } from "redux-saga/effects";
import { incrementAsync, incrementAsyncSuccess } from "./counterSlice";

function* handleIncrementAsync() {
  // simulate an async request
  yield new Promise((resolve) => setTimeout(resolve, 1000));
  yield put(incrementAsyncSuccess());
}

export function* counterSaga() {
  yield takeLatest(incrementAsync.type, handleIncrementAsync);
}
