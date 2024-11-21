import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AppLogin } from "@/components/app-login";
import { AppLayout } from "@/components/app-layout";
import { Toaster } from "@/components/ui/toaster"

export const Route = createRootRoute({
  component: () => (
    <>
      <AppLayout />
      <AppLogin />
      <TanStackRouterDevtools position="bottom-right" />
      <Toaster/>
    </>
  ),
});
