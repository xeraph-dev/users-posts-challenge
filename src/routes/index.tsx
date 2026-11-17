import { createFileRoute, Navigate } from "@tanstack/react-router";
import { memo } from "react";

export const Route = createFileRoute("/")({
  component: memo(function HomePage() {
    return <Navigate to="/users" replace />;
  }),
});
