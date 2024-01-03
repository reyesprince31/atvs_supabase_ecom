import Loader from "@/components/shared/Loader";
import { columns } from "@/components/shared/flavors/columns";
import { DataTable } from "@/components/ui/data-table";
import { useGetFlavors } from "@/lib/react-query/queries";

export default function Flavors() {
  const { data, isLoading } = useGetFlavors();

  if (isLoading) return <Loader />;

  console.log(data);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}
