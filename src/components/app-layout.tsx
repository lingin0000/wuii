import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "@tanstack/react-router";

import { titleMap, flatMenu } from "@/lib/menu";
import { useState } from "react";
// import { Dock, DockIcon } from "./ui/dock";

export function AppLayout() {
  const [open, setOpen] = useState(true);
  const pathname = useLocation({
    select: (state) => state.pathname,
  });
  const [title, subtitle] = titleMap[pathname] || [];

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <SidebarProvider onOpenChange={onOpenChange} open={open}>
      <AppSidebar />
      <SidebarInset>
        {title && subtitle && (
          <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">{title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{subtitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
        )}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
      {/* <Dock
        magnification={50}
        distance={140}
        className="fixed bottom-2 left-1/2"
      >
        {flatMenu.map((item) => (
          <DockIcon key={item.url} className="bg-black/10 dark:bg-white/10 p-3">
            <item.icon />
          </DockIcon>
        ))}
      </Dock> */}
    </SidebarProvider>
  );
}
