import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider, type QueryKey } from "@tanstack/react-query";
import { type ReactElement, type ReactNode } from "react";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
        queryFn: async ({ queryKey }: { queryKey: QueryKey }) => {
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/${queryKey.join("/")}`,
          );
          if (!res.ok) throw new Error("Failed to fetch data");
          return await res.json();
        },
      },
      mutations: {
        retry: false,
      },
    },
  });
}

export function renderWithClient(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  const testQueryClient = createTestQueryClient();

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
    queryClient: testQueryClient,
  };
}
