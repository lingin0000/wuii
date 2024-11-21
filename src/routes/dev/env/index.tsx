import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Command } from "@tauri-apps/plugin-shell";
import { useState } from "react";
import { DataTable } from "@/components/task/components/data-table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { DataTableColumnHeader } from "@/components/task/components/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Task } from "@/components/task/data/schema";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/dev/env/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleExecute = async (command: string) => {
    let result = await Command.create("exec-git", command.split(" ")).execute();
    console.log(result);
    toast({
      title: "执行结果",
      description: result.stdout,
    });
  };

  const columns: ColumnDef<Task>[] = [
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
      cell: ({ row }) => (
        <div className="w-[80px]">{row.getValue("command")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="description" />
      ),
      cell: ({ row }) => (
        <div className="w-[80px]">{row.getValue("description")}</div>
      ),
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

  return (
    <>
      <div className=" flex flex-wrap gap-6">
        {["git", "node", "nvm", "add"].map((item) => {
          if (item === "add") {
            return (
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>添加</CardTitle>
                  <CardDescription>添加新的项目</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button>添加</Button>
                </CardContent>
              </Card>
            );
          }
          return (
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>{item}</CardTitle>
                <CardDescription>{item}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleOpen}>查看命令</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>选择命令执行</DrawerTitle>
            <DrawerDescription>
              <p>请选择一个命令并点击执行按钮来运行该命令。</p>
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-3">
            <DataTable
              columns={columns}
              data={[
                {
                  id: "TASK-8782",
                  command: "config --global user.name",
                  description: "获取git全局命令",
                },
                {
                  id: "TASK-8782",
                  command: "config --global user.email",
                  description: "获取git全局命令",
                },
              ]}
            />
          </div>

          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
