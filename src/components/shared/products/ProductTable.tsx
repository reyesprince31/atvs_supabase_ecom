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
  const { data: categories, isLoading: isCategoryLoading } = useGetCategory();

  const isLoading = isProductsLoading && isFlavorsLoading && isCategoryLoading;

  if (isLoading) return <Loader />;

  const product = products?.map((product) => {
    const flavor = flavors?.find(
      (flavor) => flavor.flavor_id === product.flavor_id
    );
    const category = categories?.find(
      (category) => category.category_id === product.category_id
    );

    return {
      ...product,
      flavor: {
        ...flavor,
      },
      category: { ...category },
    };
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
          <TableHead>Cost Price</TableHead>
          <TableHead>Sale Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {product?.map((product) => (
          <ProductRow
            key={product.product_id}
            product={product}
            category={product.category}
            flavor={product.flavor}
            isLoading={isLoading}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
