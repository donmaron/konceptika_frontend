import { useRouter } from "next/router";

export type PrivateRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: JSX.Element;
  outlet: JSX.Element;
};

export function PrivateRoute({isAuthenticated, authenticationPath, outlet}: PrivateRouteProps) {
    const router = useRouter();
  if(isAuthenticated) {
    return outlet;
  } else {
    return authenticationPath;
  }
};

export default PrivateRoute;