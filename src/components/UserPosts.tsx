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
import { Skeleton } from "./ui/skeleton";

export type UserPostsProps = {
  id: number;
};

export const UserPosts = memo(function UserPosts({ id }: UserPostsProps) {
  const { data, isLoading } = useGetPostsByUserID(id);

  if (isLoading) {
    return (
      <ItemGroup data-testid="user-posts-loading">
        {[1, 2, 3].map((it) => (
          <Skeleton key={it}>
            <Item variant="outline" className="invisible">
              <ItemContent>
                <ItemTitle>{it}</ItemTitle>
                <ItemDescription>{it}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="outline">
                  <Edit />
                </Button>
                <Button variant="destructive">
                  <Trash />
                </Button>
              </ItemActions>
            </Item>
          </Skeleton>
        ))}
      </ItemGroup>
    );
  }

  if (!data || !data.length) {
    return (
      <Empty data-testid="user-posts-empty" className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Newspaper className="text-muted-foreground" />
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
      <ItemGroup data-testid="user-posts">
        {data.map((post) => (
          <Item key={post.id} variant="outline">
            <ItemContent data-testid={`user-posts-${post.id}`}>
              <ItemTitle data-testid={`user-posts-${post.id}-title`}>
                {post.title}
              </ItemTitle>
              <ItemDescription data-testid={`user-posts-${post.id}-body`}>
                {post.body}
              </ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </ScrollArea>
  );
});
