import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Trash2 } from "lucide-react";

interface DownloadRecord {
  id: number;
  url: string;
  date: string;
  status: "completed" | "failed";
}

function VideoDownloader() {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadHistory, setDownloadHistory] = useState<DownloadRecord[]>([]);

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadUrl) return;

    const newRecord: DownloadRecord = {
      id: Date.now(),
      url: downloadUrl,
      date: new Date().toLocaleString(),
      status: Math.random() > 0.2 ? "completed" : "failed",
    };

    setDownloadHistory((prev) => [newRecord, ...prev]);
    setDownloadUrl("");
  };

  const handleDeleteDownload = (id: number) => {
    setDownloadHistory((prev) => prev.filter((record) => record.id !== id));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">视频下载器</h1>

      <Card className="mt-8 mb-8 w-full">
        <CardHeader>
          <CardTitle>下载新视频</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleDownload}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Input
              type="url"
              placeholder="输入视频 URL"
              value={downloadUrl}
              onChange={(e) => setDownloadUrl(e.target.value)}
              required
              className="flex-grow"
              aria-label="视频 URL"
            />
            <Button type="submit" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              下载
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>下载历史</CardTitle>
        </CardHeader>
        <CardContent>
          {downloadHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">URL</TableHead>
                    <TableHead className="w-1/4">日期</TableHead>
                    <TableHead className="w-1/8">状态</TableHead>
                    <TableHead className="w-1/8 text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {downloadHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium break-all">
                        {record.url}
                      </TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <span
                          className={
                            record.status === "completed"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {record.status === "completed" ? "成功" : "失败"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteDownload(record.id)}
                          aria-label="删除记录"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">暂无下载记录</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/videos/download/")({
  component: VideoDownloader,
});
