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
  const handleExecute = async (command: string) => {
    if (command === "git") {
      command = command.replace("git", "").trim();
    }
    console.log("🚀 ~ handleExecute ~ command:", command);
    let result = await Command.create("exec-nvm", command.split(" ")).execute();

    const data = await codeToHtml(result.stdout || result.stderr, {
      lang: "shell",
      theme: "github-light",
    });
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

  const dataSource = Route.useLoaderData();
  return <DataTable columns={columns} data={dataSource} filter="command" />;
}
