import { TableRow, TableCell } from "@/components/ui/table";

import { IProduct } from "@/types";

const ProductRow = ({ product }: { product: IProduct }) => {
  const { model_name, puffs_count, supplier_price, regular_price, flavor_id } =
    product;

  return (
    <TableRow>
      <TableCell className="font-medium">{model_name}</TableCell>
      <TableCell>{puffs_count}</TableCell>
      <TableCell>{supplier_price}</TableCell>
      <TableCell>{regular_price}</TableCell>
      <TableCell>{flavor_id}</TableCell>
    </TableRow>
  );
};

export default ProductRow;
