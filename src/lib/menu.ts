import { DownloadIcon, LollipopIcon, Languages, GhostIcon } from "lucide-react";
import { type FileRouteTypes } from "@tanstack/react-router";

export interface MenuItem {
  title: string;
  url?: string;
  children: {
    title: string;
    url: FileRouteTypes["fullPaths"];
    icon: React.ComponentType;
  }[];
}

export const menu: MenuItem[] = [
  {
    title: "视频",
    children: [
      {
        title: "下载",
        url: "/videos/download",
        icon: DownloadIcon,
      },
    ],
  },
  {
    title: "游戏",
    children: [
      {
        title: "英雄联盟",
        url: "/games/lol",
        icon: LollipopIcon,
      },
    ],
  },
  {
    title: "开发",
    children: [
      {
        title: "国际化",
        url: "/dev/i18n",
        icon: Languages,
      },
      {
        title: "环境",
        url: "/dev/env",
        icon: GhostIcon,
      },
    ],
  },
];

export const flatMenu = menu.reduce(
  (acc, item) => {
    item.children.forEach((child) => {
      acc.push(child);
    });
    return acc;
  },
  [] as MenuItem["children"]
);

export const titleMap = menu.reduce(
  (acc, item) => {
    item.children.forEach((child) => {
      acc[child.url] = [item.title, child.title];
    });
    return acc;
  },
  {} as Record<string, [string, string]>
);
