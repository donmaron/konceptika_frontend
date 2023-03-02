import { put, takeLatest, call } from "redux-saga/effects";
import { increment, incrementByAmount } from "./counterSlice";
import { fetchPosts, Post } from "./api";

function* handleIncrementAsync() {
  const posts: Post[] = yield call(fetchPosts);
  yield put(incrementByAmount(posts.length));
}

export function* counterSaga() {
  yield takeLatest(increment.type, handleIncrementAsync);
}
