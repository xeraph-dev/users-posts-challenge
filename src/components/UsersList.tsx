import { memo } from "react";
import { Button } from "@/components/ui/button";

export const UsersList = memo(function UsersList() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1"></div>
      <Button variant="outline" className="w-full shrink-0">Create new user</Button>
    </div>
  );
});
