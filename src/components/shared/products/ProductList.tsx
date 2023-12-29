import { useState } from "react";
import { Button } from "@/components/ui/button";

import ProductTable from "./ProductTable";
import ProductForm from "@/components/Forms/ProductForm";

const ProductList = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <ProductTable />
      <Button
        onClick={() => {
          setShowForm((show) => !show);
        }}>
        Add Product
      </Button>
      {showForm && <ProductForm setShowForm={setShowForm} />}
    </>
  );
};

export default ProductList;
