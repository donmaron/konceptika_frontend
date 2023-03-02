import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectUser } from "../store/authSlice";
import { useRouter } from "next/router";
import ProductsList from "../components/ProductsList";
import styled from "styled-components";
import { logout } from "../store/authSlice";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #3e8e41;
  }
`;

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  function handleLogout() {
    dispatch(logout());
    router.push("/");
  }

  return (
    <MainContainer>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <ProductsList />
    </MainContainer>
  );
};

export default DashboardPage;
