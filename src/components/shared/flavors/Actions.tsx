import { useDeleteFlavor } from "@/lib/react-query/queries";

export const Actions = (id: number) => {
  const { mutateAsync: deleteFlavor } = useDeleteFlavor();

  const handleDelete = () => {
    deleteFlavor(id);
  };

  return { handleDelete };
};
