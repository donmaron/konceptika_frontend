import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/authSlice";
import { useRouter } from "next/router";
import { ProductsList } from "../components/ProductsList";

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
      <ProductsList
        products={products}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={handleEditProduct}
        />
    </div>
  );
};

export default Dashboard;