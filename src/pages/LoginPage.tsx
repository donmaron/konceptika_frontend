// import { useAppDispatch, useAppSelector } from "../hooks";
// import { login } from "../authSlice";
// import { LoginForm } from "../components/LoginForm";
// import { LoginFormValues } from "../components/LoginForm/types";


// const LoginPage = () => {

//   const dispatch = useAppDispatch();

//   const handleLogin = async (values: LoginFormValues) => {
//     const { email, password } = values;
//     dispatch(login({ email, password }));
//   };

//   return (
//     <div>
//       <h1>Login Page</h1>
//       <LoginForm onSubmit={handleLogin} />
//     </div>
//   );
// };

// export default LoginPage;
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { useAppDispatch } from '../hooks';
// import { login } from '../authSlice';

// const LoginPage = () => {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const resultAction = await dispatch(login({ email, password }));
//     console.log(login.fulfilled);
//     if (login.fulfilled.match(resultAction)) {
//       // Redirect to the protected dashboard page
//       router.push('/protected');
//     }
//   };

//   return (
//     <div>
//       <h1>Login Page</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="text"
//             id="email"
//             value={email}
//             onChange={(event) => setEmail(event.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

import { loginSuccess } from "../authSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectUser } from "../authSlice";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { login } from "../authSlice";
import { LoginForm } from "../components/LoginForm";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      // Redirect to dashboard if user is authenticated
      router.push('/');
    }
  }, [user]);

  const onSubmit = async (data: { email: string; password: string }) => {
    await dispatch(login(data));
  };

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default LoginPage;
