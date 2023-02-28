import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/authSlice";
import { useRouter } from "next/router";

const Dashboard = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <h1>Dashboard</h1>
      <ProductsList />
    </div>
  );
};

export default Dashboard;