import { renderWithClient } from "@/test/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UsersList } from "./UsersList";
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

describe("UserList", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("show list of users from api", async () => {
    const mockUsers = [
      { id: 1, name: "Ana" },
      { id: 2, name: "Carlos" },
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockUsers), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    renderWithClient(<UsersList />);

    expect(screen.getByTestId("users-list-loading")).toBeInTheDocument();
    expect(await screen.findByTestId("users-list")).toBeInTheDocument();
    for (const user of mockUsers) {
      expect(screen.getByTestId(`users-list-${user.id}`)).toBeInTheDocument();
      expect(
        screen.getByTestId(`users-list-${user.id}-name`),
      ).toHaveTextContent(user.name);
    }
  });

  it("show empty list", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    renderWithClient(<UsersList />);

    expect(screen.getByTestId("users-list-loading")).toBeInTheDocument();
    expect(await screen.findByTestId("users-list-empty")).toBeInTheDocument();
  });
});
