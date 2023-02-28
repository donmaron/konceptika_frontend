// import { Route, Routes, useNavigate } from "react-router-dom";
// import { useEffect } from 'react';
// import LoginPage from "./LoginPage";
// import DashboardPage from "./DashboardPage";
// import { PrivateRoute, PrivateRouteProps } from "../components/PrivateRoute";
// import { useAppDispatch, useAppSelector } from '../hooks';
// import { selectUser } from "../authSlice";
// import { Suspense } from "react";

// const App = () => {

//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const user = useAppSelector(selectUser);

//   const defaultPrivateRouteProps: Omit<PrivateRouteProps, 'outlet'> = {
//     isAuthenticated: !!user,
//     authenticationPath: '/login',
//   };
  
//   return (
//     <div>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path='protected' element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<DashboardPage />} />} />
//         </Routes>
//       </Suspense>
//     </div>
//   );
// };

// export default App;



// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { RootState } from '../store';
// import { login } from '../authSlice';

// const LoginPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const auth = useSelector((state: RootState) => state.auth);

//   const handleLogin = () => {
//     dispatch(login());
//   };
 
//   useEffect(() => {
//     if (auth.isLoggedIn) {
//       navigate('/dashboardpage');
//     }
//   }, [auth.isLoggedIn, history]);

//   return (
//     <div>
//       <h1>Login Page</h1>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default LoginPage;
import { Route, Routes, useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import { useEffect } from 'react';
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import { PrivateRoute, PrivateRouteProps } from "../components/PrivateRoute";
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectUser } from "../authSlice";
import { Suspense } from "react";

const App = () => {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const defaultPrivateRouteProps: Omit<PrivateRouteProps, 'outlet'> = {
    isAuthenticated: !!user,
    authenticationPath: '/login',
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path='/DashboardPage' element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<DashboardPage />} />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
