import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/dev/env/")({
  component: RouteComponent,
});

function RouteComponent() {
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
                <Link to={`/dev/env/exec-command/${item}`}>
                  <Button>查看命令</Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
