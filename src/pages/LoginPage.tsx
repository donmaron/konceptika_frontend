import { useAppDispatch, useAppSelector } from "../hooks";
import { selectUser } from "../store/authSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { login } from "../store/authSlice";
import { LoginForm } from "../components/LoginForm";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const onSubmit = async (data: { email: string; password: string }) => {
    await dispatch(login(data));
  };

  return (
    <MainContainer>
      <LoginForm onSubmit={onSubmit} />
    </MainContainer>
  );
};

export default LoginPage;
