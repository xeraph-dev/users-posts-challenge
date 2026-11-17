import { memo } from "react";
import { Item, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item";
import { Link } from "@tanstack/react-router";
import { useGetUsers } from "@/hooks/useGetUsers";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { UserPlus } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

export const UsersList = memo(function UsersList() {
  const { data, isLoading } = useGetUsers();

  if (isLoading) {
    return (
      <div className="flex flex-col h-full overflow-hidden gap-4">
        <ItemGroup>
          {[1, 2, 3].map((it) => (
            <Skeleton>
              <Item key={it} variant="outline" className="invisible">
                <ItemContent>
                  <ItemTitle>{it}</ItemTitle>
                </ItemContent>
              </Item>
            </Skeleton>
          ))}
        </ItemGroup>
      </div>
    );
  }

  if (!data) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UserPlus className="text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>No users found</EmptyTitle>
          <EmptyDescription>
            Get started by creating a new user profile.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">
            Create new user
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden gap-4">
      <ScrollArea className="h-full min-h-0 flex-1">
        <ItemGroup>
          {data.map((user) => (
            <Item
              key={user.id}
              variant="outline"
              render={
                <Link to="/users/$id" params={{ id: user.id }}>
                  <ItemContent>
                    <ItemTitle>{user.name}</ItemTitle>
                  </ItemContent>
                </Link>
              }
            ></Item>
          ))}
        </ItemGroup>
      </ScrollArea>
    </div>
  );
});
