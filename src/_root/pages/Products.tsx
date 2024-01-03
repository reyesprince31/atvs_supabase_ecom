import ProductForm from "@/components/Forms/ProductForm";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProductTable from "@/components/shared/products/ProductTable";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Products() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Breadcrumb pageName="Products" />
      <div className="flex flex-col gap-10">
        <ProductTable />
        <Button
          onClick={() => {
            setShowForm((show) => !show);
          }}>
          Add Product
        </Button>
        {showForm && <ProductForm setShowForm={setShowForm} />}
      </div>
    </>
  );
}
