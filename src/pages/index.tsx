import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import { PrivateRoute, PrivateRouteProps } from "../components/PrivateRoute";
import { useAppSelector } from '../hooks';

const defaultPrivateRouteProps: Omit<PrivateRouteProps, 'outlet'> = {
  isAuthenticated: true,//useAppSelector(state => state.auth),
  authenticationPath: '/login',
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path='protected' element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<DashboardPage />} />} />
      </Routes>
    </div>
  );
};

export default App;
