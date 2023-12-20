import Loader from "@/components/shared/Loader";
import { useGetProducts } from "@/lib/react-query/queries";

export default function Products() {
  const { data: products, isLoading } = useGetProducts();

  if (isLoading) return <Loader />;

  console.log(products);
  return <div>ProductList</div>;
}
