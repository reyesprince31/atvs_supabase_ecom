import ProductRow from "./ProductRow";
import Loader from "../Loader";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
} from "@/components/ui/table";

import {
  useGetProducts,
  useGetFlavors,
  useGetCategory,
} from "@/lib/react-query/queries";

const ProductTable = () => {
  const { data: products, isLoading: isProductsLoading } = useGetProducts();
  const { data: flavors, isLoading: isFlavorsLoading } = useGetFlavors();
  const { data: category, isLoading: isCategoryLoading } = useGetCategory();

  const isLoading = isProductsLoading && isFlavorsLoading && isCategoryLoading;

  if (isLoading) return <Loader />;

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

  return (
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
            isLoading={isLoading}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
