// ProductRow.tsx
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { useDeleteProduct } from "@/lib/react-query/queries";
import { formatCurrency } from "@/lib/utils";
import { VapeProduct } from "@/types";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type ProductRowProps = {
  product: VapeProduct;
};

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  const { toast } = useToast();
  const { id, model_name, puffs_count, supplier_price, regular_price } =
    product;

  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleDelete = () => {
    deleteProduct(id);
    toast({ title: "Deleted Succesfully" });
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-3">{model_name}</div>
      </TableCell>
      <TableCell>{puffs_count}</TableCell>
      <TableCell>{formatCurrency(supplier_price)}</TableCell>
      <TableCell className="text-green-500">
        {formatCurrency(regular_price)}
      </TableCell>
      <TableCell>
        <Button
          variant="outline"
          size="icon"
          onClick={handleDelete}
          disabled={isPending}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
