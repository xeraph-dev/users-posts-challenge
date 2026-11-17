import { createFileRoute } from "@tanstack/react-router";
import { memo } from "react";

export const Route = createFileRoute("/users/$id")({
  component: memo(function UserPage() {
    const { id } = Route.useParams();
    return <div>User ID: {id}</div>;
  }),
});
