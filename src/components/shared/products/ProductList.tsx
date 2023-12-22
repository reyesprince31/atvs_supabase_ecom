import Loader from "@/components/shared/Loader";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
} from "../../ui/table";
import { useGetProducts } from "@/lib/react-query/queries";
import ProductRow from "./ProductRow";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/Forms/ProductForm";
import { useState } from "react";

const ProductList = () => {
  const [showForm, setShowForm] = useState(false);
  const { data: products, isLoading } = useGetProducts();

  if (isLoading) return <Loader />;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Puffs</TableHead>
            <TableHead>Supplier Price</TableHead>
            <TableHead>Regular Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </TableBody>
      </Table>
      <Button
        onClick={() => {
          setShowForm((show) => !show);
        }}>
        Add Product
      </Button>
      {showForm && <ProductForm />}
    </>
  );
};

export default ProductList;
