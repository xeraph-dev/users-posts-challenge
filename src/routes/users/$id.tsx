import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { User } from "lucide-react";
import { memo } from "react";
import { z } from "zod";

export const Route = createFileRoute("/users/$id")({
  params: zodValidator(
    z.object({
      id: z.coerce.number().int().positive(),
    }),
  ),
  component: memo(function UserPage() {
    const { id } = Route.useParams();
    return <div>User ID: {id}</div>;
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
