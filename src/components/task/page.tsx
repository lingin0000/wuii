import tasksJson from "./data/taks.json";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { taskSchema } from "./data/schema";

function getTasks() {
  return z.array(taskSchema).parse(tasksJson);
}

export default function TaskPage() {
  const tasks = getTasks();
  return <DataTable data={tasks} columns={columns} />;
}
