import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { codeToHtml } from "shiki";
import dataList from "./command.json";
import { Command } from "@tauri-apps/plugin-shell";

type TCommand = {
  command: string;
  description: string;
  type: string;
};

const getCommandList = async (command: string) => {
  return dataList.filter((item) => item.type === command);
};

export const Route = createFileRoute("/dev/env/exec-command/$command")({
  loader: async ({ params: { command } }) => getCommandList(command),
  component: RouteComponent,
});

function RouteComponent() {
  const dataSource = Route.useLoaderData();
  const handleExecute = async (command: string) => {
    const cmd = command.split(" ")[0];
    command = command.replace(cmd, "").trim();
    console.log(cmd, "2222", command);
    const name = `exec-${cmd}`;
    console.log(name, command.split(" "));
    const result = await Command.create(name, command.split(" ")).execute();
    console.log(result);

    if (!result) {
      toast({
        title: "执行结果",
        description: "执行失败",
      });
      return;
    }

    const data = await codeToHtml(
      result.stdout || result.stderr || "not found",
      {
        lang: "shell",
        theme: "github-light",
      }
    );

    toast({
      title: "执行结果",
      description: <div dangerouslySetInnerHTML={{ __html: data }} />,
    });
  };

  const columns: ColumnDef<TCommand>[] = [
    {
      accessorKey: "command",
      header: "命令",
    },
    {
      accessorKey: "description",
      header: "描述",
    },
    {
      header: "操作",
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

  return <DataTable columns={columns} data={dataSource} filter="command" />;
}
