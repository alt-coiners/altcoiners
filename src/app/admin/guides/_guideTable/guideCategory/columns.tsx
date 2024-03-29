import { Button } from "@/components/ui/button";
import type { GuideCategory } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<GuideCategory>[] = [
  // {
  //   id: "edit",
  //   header: ({ table }) => <Button variant="ghost">Edit</Button>,
  //   cell: ({ row }) => <EditVideoCategory videoCategoryId={row.original.id} />,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
