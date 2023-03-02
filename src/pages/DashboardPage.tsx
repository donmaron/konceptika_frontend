import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectUser } from "../authSlice";
import { useRouter } from "next/router";
import ProductsList from "../components/ProductsList";
import styled from "styled-components";
import { logout } from "../authSlice";

const LogoutButton = styled.button`
  padding: 0.5rem;
  position: absolute;
  top: 2rem;
  right: 2rem;
  `;

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = !user;
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <ProductsList />
    </div>
  );
};

export default DashboardPage;