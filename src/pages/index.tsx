import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { increment, decrement, incrementByAmount, incrementAsync } from "../counterSlice";
import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);
  const posts = useSelector((state: RootState) => state.counter.posts);

  // ...

  return (
    <div>
      <Button onClick={() => dispatch(increment())}>+</Button>
      <span>{count}</span>
      <Button onClick={() => dispatch(decrement())}>-</Button>
      <Button onClick={() => dispatch(incrementByAmount(10))}>+10</Button>
      <Button onClick={() => dispatch(incrementAsync())}>+ (async)</Button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
