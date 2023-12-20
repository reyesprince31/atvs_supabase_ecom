import { getProducts } from "@/lib/supabase/api";
import { useEffect } from "react";

export default function ProductList() {
  useEffect(() => {
    getProducts().then((data) => console.log(data));
  }, []);

  return <div>ProductList</div>;
}
