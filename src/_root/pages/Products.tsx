import Breadcrumb from "@/components/shared/Breadcrumb";
import ProductList from "@/components/shared/products/ProductList";

export default function Products() {
  return (
    <>
      <Breadcrumb pageName="Products" />
      <div className="flex flex-col gap-10">
        <ProductList />
      </div>
    </>
  );
}
