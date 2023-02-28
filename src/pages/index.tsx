import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { increment, decrement, incrementByAmount, incrementAsync } from "../counterSlice";
import { useEffect } from "react";
import { fetchPosts, Post } from "../api";

export default function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);
  const posts = useSelector((state: RootState) => state.counter.posts);

  useEffect(() => {
    fetchPosts().then((data: Post[]) => {
      dispatch(incrementAsync(data.length));
    });
  }, []);

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>+10</button>
      <button onClick={() => dispatch(incrementAsync())}>+ (async)</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
