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

interface ProductRowProps {
  product: IProduct;
  category: ICategory;
  flavor: IFlavor;
  isLoading: boolean;
}

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  category,
  flavor,
  isLoading,
}) => {
  const [showForm, setShowForm] = useState(false);

  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const { product_id, product_name, description } = product;
  const { category_id, category_name, cost_price, sale_price } = category;
  const { flavor_id, flavor_name, flavor_qty, image_url } = flavor;

  const editData = {
    product_id,
    product_name,
    description,
    flavor_name,
    category_name,
  };

  const handleDelete = () => {
    if (product.product_id) {
      deleteProduct(product.product_id);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          <div className="lg:flex lg:items-center lg:gap-4">
            <img
              src={image_url ? image_url : "/images/product/product-01.png"}
              alt="product-image"
              width={50}
              height={50}
            />
            <div className="flex items-center gap-3">{product_name}</div>
          </div>
        </TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>
          {category_id ? category_name : <span>&mdash;</span>}
        </TableCell>
        <TableCell>{flavor_id ? flavor_name : <span>&mdash;</span>}</TableCell>
        <TableCell>{flavor_id ? flavor_qty : <span>&mdash;</span>}</TableCell>
        <TableCell className="text-green-500">
          {category_id ? formatCurrency(cost_price) : <span>&mdash;</span>}
        </TableCell>
        <TableCell className="text-green-500">
          {category_id ? formatCurrency(sale_price) : <span>&mdash;</span>}
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
            <ProductForm editProduct={editData} setShowForm={setShowForm} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default ProductRow;
