import { put, takeLatest, call } from "redux-saga/effects";
import { incrementAsync, incrementAsyncSuccess } from "./counterSlice";
import { fetchPosts, Post } from "./api";

function* handleIncrementAsync() {
  // fetch posts from API
  const posts: Post[] = yield call(fetchPosts);
  // update state
  yield put(incrementAsyncSuccess(posts.length));
}

export function* counterSaga() {
  yield takeLatest(incrementAsync.type, handleIncrementAsync);
}
