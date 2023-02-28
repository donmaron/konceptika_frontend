import { useAppSelector } from "../store";
import { selectUser } from "../authSlice";

const DashboardPage = () => {
  const user = useAppSelector(selectUser);

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Welcome, {user?.name}!</p>
    </div>
  );
};

export default DashboardPage;
