import { ColumnDef } from "@tanstack/react-table";

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
  flavorid: number;
  image_url: string;
  flavor_name: string;
  description: string;
  flavor_qty: number;
};

export const FlavorRow: ColumnDef<TFlavors>[] = [
  {
    accessorKey: "flavor_name",
    header: () => <div>Flavors</div>,
    cell: ({ row }) => {
      return (
        <div className="block lg:flex lg:items-center gap-2">
          <img
            src={
              row.original.image_url
                ? row.original.image_url
                : "/images/product/product-01.png"
            }
            alt="product-img"
            width={50}
            height={50}
          />
          <span>{row.getValue("flavor_name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },

  {
    accessorKey: "flavor_qty",
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
      <div className="text-right mr-4">{row.getValue("flavor_qty")} pcs</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
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
