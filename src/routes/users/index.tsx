import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";
import { memo } from "react";

export const Route = createFileRoute("/users/")({
  component: memo(function EmptyUserPage() {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <User className="text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>No user selected</EmptyTitle>
          <EmptyDescription>
            Select a user or create one to view their details and posts
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">
            Create new user
          </Button>
        </EmptyContent>
      </Empty>
    );
  }),
});
