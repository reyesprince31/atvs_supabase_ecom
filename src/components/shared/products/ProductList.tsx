import { useState } from "react";
import Loader from "@/components/shared/Loader";
import ProductForm from "@/components/Forms/ProductForm";
import ProductRow from "./ProductRow";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
} from "../../ui/table";

import {
  useGetCategory,
  useGetFlavors,
  useGetProducts,
} from "@/lib/react-query/queries";
import { Button } from "@/components/ui/button";

const ProductList = () => {
  const [showForm, setShowForm] = useState(false);
  const { data: products, isLoading: isProductsLoading } = useGetProducts();
  const { data: flavors, isLoading: isFlavorsLoading } = useGetFlavors();
  const { data: category, isLoading: isCategoryLoading } = useGetCategory();

  if (isProductsLoading && isFlavorsLoading && isCategoryLoading)
    return <Loader />;

  console.log("cat: ", category);

  const allProducts = products?.map((product) => {
    const filteredFlavor = flavors?.find(
      (flavor) => flavor.flavorid === product.flavorid
    );
    const filteredCategory = category?.find(
      (cat) => cat.id === product.categoryid
    );
    const flavoredProduct = {
      ...product,
      categoryid: filteredCategory,
      flavorid: filteredFlavor,
    };

    return flavoredProduct;
  });

  console.log(allProducts);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Flavor</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Regular Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allProducts?.map((product) => (
            <ProductRow
              key={product.productid}
              product={product}
              category={product.categoryid}
              flavor={product.flavorid}
            />
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
