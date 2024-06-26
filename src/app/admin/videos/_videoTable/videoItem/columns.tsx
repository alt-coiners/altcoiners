import DeleteItem from "@/components/admin/DeleteItem";
import { Button } from "@/components/ui/button";
import type { Video, VideoCategory } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import EditVideo from "./create";

export const columns: ColumnDef<Video & { VideoCategory: VideoCategory }>[] = [
  {
    id: "edit",
    header: ({}) => <Button variant="ghost">Edit</Button>,
    cell: ({ row }) => <EditVideo videoId={row.original.id} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "delete",
    header: ({}) => <Button variant="ghost">Delete</Button>,
    cell: ({ row }) => <DeleteItem id={row.original.id} itemType="video" />,
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "url",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          URL
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "picture",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Picture
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.picture}
          alt="image"
          width={100}
          height={100}
        />
      );
    },
  },
  {
    accessorKey: "VideoCategory.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
