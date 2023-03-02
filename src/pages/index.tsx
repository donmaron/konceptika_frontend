import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import LoginPage from "../pages/LoginPage";
import { PrivateRoute, PrivateRouteProps } from "../components/PrivateRoute";
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectUser, checkLoggedIn } from "../authSlice";
import { Suspense } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const App = () => {

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);  

  if(!user){
    dispatch(checkLoggedIn());
  }

  const defaultPrivateRouteProps: Omit<PrivateRouteProps, 'outlet'> = {
    isAuthenticated: !!user,
    authenticationPath: <LoginPage />,
  };
  
  return (
      <Suspense fallback={<div>Wczytywanie...</div>}>
        <Routes>
          <Route path='/' element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<DashboardPage />} />} />
        </Routes>
      </Suspense>
  );
};

export default App;
