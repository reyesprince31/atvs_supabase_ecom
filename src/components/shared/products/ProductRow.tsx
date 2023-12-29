// ProductRow.tsx
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { useDeleteProduct } from "@/lib/react-query/queries";
import { formatCurrency } from "@/lib/utils";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ICategory, IFlavor, IProduct } from "@/types";

const ProductRow = ({
  product,
  category,
  flavor,
}: {
  product: IProduct;
  category: ICategory;
  flavor: IFlavor;
}) => {
  const { toast } = useToast();

  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleDelete = () => {
    // deleteProduct(+product?.productid);
    toast({ title: "Deleted Succesfully" });
  };

  // console.log("prod: ", product);
  // console.log("cat: ", category);
  // console.log("flav: ", flavor);

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="lg:flex lg:items-center lg:gap-4">
          <img
            src={flavor?.imageurl}
            alt="product-image"
            width={50}
            height={50}
          />
          <div className="flex items-center gap-3">{product?.productName}</div>
        </div>
      </TableCell>
      <TableCell>{product?.description}</TableCell>
      <TableCell>{category?.categoryName}</TableCell>
      <TableCell>{flavor?.name}</TableCell>
      <TableCell>{flavor?.stockquantity}</TableCell>
      <TableCell className="text-green-500">
        {formatCurrency(flavor?.price)}
      </TableCell>
      <TableCell>
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {}}
            disabled={isPending}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleDelete}
            disabled={isPending}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
