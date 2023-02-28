import { put, takeLatest, call } from "redux-saga/effects";
import { increment, incrementByAmount } from "./counterSlice";
import { fetchPosts, Post } from "./api";

function* handleIncrementAsync() {
  // fetch posts from API
  const posts: Post[] = yield call(fetchPosts);
  // update state
  yield put(incrementByAmount(posts.length));
}

export function* counterSaga() {
  yield takeLatest(increment.type, handleIncrementAsync);
}
