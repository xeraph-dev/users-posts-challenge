import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { Trash } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useGetUsers } from "@/hooks/useGetUsers";
import { ScrollArea } from "@/components/ui/scroll-area";

export const UsersList = memo(function UsersList() {
  const { data } = useGetUsers();

  return (
    <div className="flex flex-col h-full overflow-hidden gap-4">
      <ScrollArea className="h-full min-h-0 flex-1">
        <ItemGroup>
          {data?.map((user) => (
            <Item
              key={user.id}
              variant="outline"
              className="group/item"
              render={
                <Link to="/users/$id" params={{ id: user.id }}>
                  <ItemContent>
                    <ItemTitle>{user.name}</ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <Button
                      variant="destructive"
                      className="invisible group-hover/item:visible"
                    >
                      <Trash />
                    </Button>
                  </ItemActions>
                </Link>
              }
            ></Item>
          ))}
        </ItemGroup>
      </ScrollArea>
      <div className="shrink-0">
        <Button variant="outline" className="w-full">
          Create new user
        </Button>
      </div>
    </div>
  );
});
