// import { Route, Navigate, RouteProps } from "react-router-dom";
// import { useAppSelector } from "../hooks";
// import { selectUser } from "../authSlice";

// interface PrivateRouteProps extends RouteProps {
//   component: React.ComponentType<any>;
// }

// export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
//   const user = useAppSelector(selectUser);

//   return (
//     <Route
//       {...rest}
//       render={(props) => (user ? <Component {...props} /> : <Navigate to="/" />)}
//     />
//   );
// };

// import { Navigate, Route, RouteProps } from 'react-router';

// export type PrivateRouteProps = {
//     isAuthenticated: boolean;
//     authenticationPath: string;
//     outlet: JSX.Element;
//   };
  
//   export function PrivateRoute({isAuthenticated, authenticationPath, outlet}: PrivateRouteProps) {
//     if(isAuthenticated) {
//       return outlet;
//     } else {
//       return <Navigate to={{ pathname: authenticationPath }} />;
//     }
//   };
  
import { Navigate, Route, RouteProps } from 'react-router-dom';

export type PrivateRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

export function PrivateRoute({isAuthenticated, authenticationPath, outlet}: PrivateRouteProps) {
  if(isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
};

export default PrivateRoute;