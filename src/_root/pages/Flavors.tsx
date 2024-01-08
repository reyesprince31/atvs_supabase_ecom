import FlavorForm from "@/components/Forms/FlavorForm";
import Loader from "@/components/shared/Loader";
import { FlavorRow as columns } from "@/components/shared/flavors/FlavorRow";

import { DataTable } from "@/components/ui/data-table";
import { useGetFlavors } from "@/lib/react-query/queries";

export default function Flavors() {
  const { data: Flavors, isLoading } = useGetFlavors();

  // console.log(columns);
  // console.log(Flavors);
  return (
    <div className="container mx-auto py-10">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={Flavors || []}
            filterName="flavor_qty"
          />

          <FlavorForm />
        </>
      )}
    </div>
  );
}
