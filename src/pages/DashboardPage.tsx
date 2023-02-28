import ProductsList from "../components/ProductsList";

const DashboardPage = () => {
  const user = useAppSelector(selectUser);

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Welcome, {user?.name}!</p>
      <ProductsList />
    </div>
  );
};

export default DashboardPage;
