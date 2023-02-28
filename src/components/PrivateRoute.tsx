import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "../store";
import { selectUser } from "../authSlice";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const user = useAppSelector(selectUser);

  return (
    <Route
      {...rest}
      render={(props) => (user ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};
