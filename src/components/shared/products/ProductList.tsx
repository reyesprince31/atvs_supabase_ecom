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
import { IProduct } from "@/types";

const ProductList = () => {
  const { data: products, isLoading } = useGetProducts();

  if (isLoading) return <Loader />;

  // console.log(products);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product Name</TableHead>
          <TableHead>Puffs</TableHead>
          <TableHead>Supplier Price</TableHead>
          <TableHead>Regular Price</TableHead>
          <TableHead>Flavor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((product: IProduct) => (
          <ProductRow product={product} key={product.id} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductList;
