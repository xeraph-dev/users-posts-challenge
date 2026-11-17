import { renderWithClient } from "@/test/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserPosts } from "./UserPosts";
import { screen } from "@testing-library/react";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    Link: ({
      children,
      to,
      params,
    }: {
      children: React.ReactNode;
      to: string;
      params?: Record<string, any>;
    }) => {
      // Reemplaza los parámetros de la ruta si los hay (ej: /users/$id -> /users/1)
      let resolvedTo = to;
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          resolvedTo = resolvedTo.replace(`$${key}`, String(value));
        });
      }
      return <a href={resolvedTo}>{children}</a>;
    },
  };
});

describe("UserPosts", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("show list of posts from api", async () => {
    const mockPosts = [
      { id: 1, title: "Post 1", body: "Post 2" },
      { id: 2, title: "Post 1", body: "Post 2" },
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockPosts), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    renderWithClient(<UserPosts id={-1} />);

    expect(screen.getByTestId("user-posts-loading")).toBeInTheDocument();
    expect(await screen.findByTestId("user-posts")).toBeInTheDocument();
    for (const user of mockPosts) {
      expect(screen.getByTestId(`user-posts-${user.id}`)).toBeInTheDocument();
      expect(
        screen.getByTestId(`user-posts-${user.id}-title`),
      ).toHaveTextContent(user.title);
      expect(
        screen.getByTestId(`user-posts-${user.id}-body`),
      ).toHaveTextContent(user.body);
    }
  });

  it("show empty list", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    renderWithClient(<UserPosts id={-1} />);

    expect(screen.getByTestId("user-posts-loading")).toBeInTheDocument();
    expect(await screen.findByTestId("user-posts-empty")).toBeInTheDocument();
  });
});
