import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import ProductList from "./pages/ProductList";

const RootLayout = () => {
  return (
    <div>
      <Dashboard />
      <ProductList />
      <PageNotFound />
    </div>
  );
};

export default RootLayout;
