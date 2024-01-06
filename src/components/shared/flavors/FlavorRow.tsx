import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/utils";

import { ArrowUpDown, Edit, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type TFlavors = {
  flavorid?: number;
  imageurl?: string;
  name: string;
  description: string;
  price: number;
  stockquantity: number;
};

export const FlavorRow: ColumnDef<TFlavors>[] = [
  {
    accessorKey: "name",
    header: () => <div>Flavors</div>,
    cell: ({ row }) => {
      console.log(row);
      return (
        <div className="block lg:flex lg:items-center gap-2">
          <img
            src={row.original.imageurl}
            alt="product-img"
            width={50}
            height={50}
          />
          <span>{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: () => <div>Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      return <div className="font-medium">{formatCurrency(price)}</div>;
    },
  },
  {
    accessorKey: "stockquantity",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Quantity
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-right mr-4">{row.getValue("stockquantity")}</div>
    ),
  },

  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="space-x-2"
              onClick={() => console.log("Duplicate")}>
              <Edit className="h-4 w-4" /> <span>Duplicate</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="space-x-2"
              onClick={() => console.log("Edit")}>
              <Edit className="h-4 w-4" /> <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="space-x-2"
              onClick={() => console.log("Delete")}>
              <Trash2 className="h-4 w-4" /> <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
