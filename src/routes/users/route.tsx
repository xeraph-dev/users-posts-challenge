import { Separator } from "@/components/ui/separator";
import { UsersList } from "@/components/UsersList";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { memo } from "react";

export const Route = createFileRoute("/users")({
  component: memo(function UsersLayout() {
    return (
      <div className="flex flex-1">
        <aside className="w-72 shrink-0 p-4">
          <UsersList />
        </aside>
        <Separator orientation="vertical" />
        <main className="flex-1 min-w-0 p-4">
          <Outlet />
        </main>
      </div>
    );
  }),
});
