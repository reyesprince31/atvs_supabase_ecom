import { Routes, Route, Navigate } from "react-router-dom";

import RootLayout from "./_root/RootLayout";
import Dashboard from "./_root/pages/Dashboard";
import ProductList from "./_root/pages/ProductList";
import PageNotFound from "./_root/pages/PageNotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
