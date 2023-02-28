import { useEffect } from "react";
import { useAppSelector } from '../hooks';
import { selectUser } from "../authSlice";
import { useRouter } from "next/router";
import ProductsList from "../components/ProductsList";

const DashboardPage = () => {
  const user = useAppSelector(selectUser);
  const isAuthenticated = user!==null;
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
        // products={products}
        // onDeleteProduct={handleDeleteProduct}
        // onEditProduct={handleEditProduct}
        />
    </div>
  );
};

export default DashboardPage;