import { Routes, Route, Navigate } from "react-router-dom";

import RootLayout from "./_root/RootLayout";
import Dashboard from "./_root/pages/Dashboard";
import Products from "./_root/pages/Products";
import PageNotFound from "./_root/pages/PageNotFound";

import { Toaster } from "@/components/ui/toaster";

import "./index.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Toaster />
    </>
  );
}
