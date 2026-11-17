import { CreatePost } from "@/components/CreatePost";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserDetails } from "@/components/UserDetails";
import { UserPosts } from "@/components/UserPosts";
import { useIsFetching } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { cn } from "cn";
import { User } from "lucide-react";
import { memo, useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/users/$id")({
  params: zodValidator(
    z.object({
      id: z.coerce.number().int().positive(),
    }),
  ),
  component: memo(function UserPage() {
    const { id } = Route.useParams();

    const detailsIsFetching = useIsFetching({ queryKey: ["users", id] });
    const postsIsFetching = useIsFetching({ queryKey: ["users", id, "posts"] });

    const [value, setValue] = useState<string>("details");

    return (
      <div className="flex flex-col min-h-0">
        <div className="w-full">
          <div className="flex justify-end items-center gap-2">
            <Spinner
              className={cn("invisible", {
                visible: detailsIsFetching || postsIsFetching,
              })}
            />
            <CreatePost hidden={value !== "posts"} userId={id} />
          </div>
        </div>
        <Tabs
          value={value}
          onValueChange={(value) => setValue(value)}
          className="h-full flex flex-col min-h-0 flex-1"
        >
          <TabsList className="shrink-0">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>
          <TabsContent
            value="details"
            className="h-full flex-1 min-h-0 flex flex-col"
          >
            <UserDetails id={id} />
          </TabsContent>
          <TabsContent
            value="posts"
            className="h-full flex-1 min-h-0 flex flex-col"
          >
            <UserPosts id={id} />
          </TabsContent>
        </Tabs>
      </div>
    );
  }),
  errorComponent: memo(function UserErrorPage() {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <User className="text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>Routing error</EmptyTitle>
          <EmptyContent>
            <Link to="/users">
              <Button variant="outline">Back</Button>
            </Link>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    );
  }),
});
