import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserDetails } from "@/components/UserDetails";
import { UserPosts } from "@/components/UserPosts";
import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
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

    const [value, setValue] = useState<string>("details");

    return (
      <div className="flex flex-col">
        <div className="w-full flex justify-end" hidden={value !== "posts"}>
          <Button variant="outline" className="mb-[-100%]">Create new post</Button>
        </div>
        <Tabs
          value={value}
          onValueChange={(value) => setValue(value)}
          className="h-full flex flex-col"
        >
          <TabsList>
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
            <User />
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
