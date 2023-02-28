import { useAppDispatch } from "../hooks";
import { login } from "../authSlice";
import { LoginForm } from "../components/LoginForm";
import { LoginFormValues } from "../components/LoginForm/types";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const handleLogin = async (values: LoginFormValues) => {
    const { email, password } = values;
    dispatch(login({ email, password }));
  };

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
