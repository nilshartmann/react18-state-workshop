import { screen, render } from "@testing-library/react";
import PostListPage from "../PostListPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { mockData } from "./mock-data.ts";
import fetchMock from "jest-fetch-mock";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { jest } from "@jest/globals";

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders list of blog posts", async () => {
  fetchMock.enableMocks();
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <PostListPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );

  expect(screen.getByText(/Loading, please wait/i)).toBeInTheDocument();

  expect(
    await screen.findByRole("heading", { name: /keep calm/i }),
  ).toBeInTheDocument();
});
