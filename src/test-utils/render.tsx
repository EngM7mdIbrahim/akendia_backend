// ./test-utils/render.tsx
import { render as testingLibraryRender } from "@testing-library/react";
import { DEFAULT_THEME, MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={DEFAULT_THEME}>
          <BrowserRouter>{children}</BrowserRouter>
        </MantineProvider>
      </QueryClientProvider>
    ),
  });
}
