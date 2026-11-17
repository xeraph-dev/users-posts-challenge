import { memo } from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "./ui/item";
import { useGetPostsByUserID } from "@/hooks/useGetPostsByUserID";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { Edit, Newspaper, Trash } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

export type UserPostsProps = {
  id: number;
};

export const UserPosts = memo(function UserPosts({ id }: UserPostsProps) {
  const { data } = useGetPostsByUserID(id);

  if (!data) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Newspaper />
          </EmptyMedia>
          <EmptyTitle>No posts yet</EmptyTitle>
          <EmptyDescription>
            This user hasn't created any posts
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <ScrollArea className="h-full">
      <ItemGroup>
        {data?.map((post) => (
          <Item key={post.id} variant="outline">
            <ItemContent>
              <ItemTitle>{post.title}</ItemTitle>
              <ItemDescription>{post.body}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline">
                <Edit />
              </Button>
              <Button
                variant="destructive"
              >
                <Trash />
              </Button>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </ScrollArea>
  );
});
