import { Separator } from "@/components/ui/separator";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { memo } from "react";

export const Route = createRootRoute({
  component: memo(function Root() {
    return (
      <div className="flex flex-col max-h-screen min-h-screen">
        <header className="p-4 text-xl shrink-0">Users and Posts</header>
        <Separator />
        <Outlet />
      </div>
    );
  }),
});
