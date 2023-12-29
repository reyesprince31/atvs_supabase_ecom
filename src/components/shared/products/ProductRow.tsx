// ProductRow.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { useDeleteProduct } from "@/lib/react-query/queries";
import { formatCurrency } from "@/lib/utils";
import { Edit, Trash2 } from "lucide-react";
import { ICategory, IFlavor, IProduct } from "@/types";
import ProductForm from "@/components/Forms/ProductForm";
import Loader from "../Loader";

const ProductRow = ({
  product,
  category,
  flavor,
  isLoading,
}: {
  product: IProduct;
  category: ICategory;
  flavor: IFlavor;
  isLoading: boolean;
}) => {
  const [showForm, setShowForm] = useState(false);
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const alldata = { product, category, flavor };

  const handleDelete = () => {
    if (product.productid) {
      deleteProduct(product.productid);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          <div className="lg:flex lg:items-center lg:gap-4">
            <img
              src={
                flavor?.imageurl
                  ? flavor?.imageurl
                  : "src/images/product/product-01.png"
              }
              alt="product-image"
              width={50}
              height={50}
            />
            <div className="flex items-center gap-3">{product.productName}</div>
          </div>
        </TableCell>
        <TableCell>{product.description}</TableCell>
        <TableCell>
          {category?.categoryName ? (
            category?.categoryName
          ) : (
            <span>&mdash;</span>
          )}
        </TableCell>
        <TableCell>
          {flavor?.name ? flavor?.name : <span>&mdash;</span>}
        </TableCell>
        <TableCell>
          {flavor?.stockquantity ? flavor?.stockquantity : <span>&mdash;</span>}
        </TableCell>
        <TableCell className="text-green-500">
          {flavor?.price ? formatCurrency(flavor?.price) : <span>&mdash;</span>}
        </TableCell>
        <TableCell>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowForm((show) => !show)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleDelete}
              disabled={isDeleting}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {showForm && (
        <TableRow>
          <TableCell colSpan={7}>
            <ProductForm editProduct={alldata} setShowForm={setShowForm} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default ProductRow;
