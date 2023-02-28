import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { increment, decrement, incrementByAmount } from "../counterSlice";
import incrementAsync from "../counterSlice"

export default function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>+10</button>
      <button onClick={() => dispatch(incrementAsync())}>+ (async)</button>
    </div>
  );
}
