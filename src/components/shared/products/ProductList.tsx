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

const ProductList = () => {
  const { data: products, isLoading } = useGetProducts();

  if (isLoading) return <Loader />;

  return (
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
  );
};

export default ProductList;
