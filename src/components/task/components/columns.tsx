"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "command",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="command" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("command")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="description" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("description")}</div>,
  },
  {
    id: "execute",
    cell: ({ row }) => (
      <Button
        onClick={() => {
          handleExecute(row.getValue("command"));
        }}
      >
        执行
      </Button>
    ),
  },
];
