import { render, screen } from "@testing-library/react";
import { NotionIntegration } from "./notion-integration";
import ReactQueryProvider from "@/provider/react-query";
import { QueryCache } from "@tanstack/react-query";
import { afterEach, expect, describe, it, vitest } from "vitest";

const queryCache = new QueryCache();

vitest.mock("next/navigation", () => ({
  useRouter: vitest.fn(() => ({
    push: vitest.fn(),
  })),
  useSearchParams: vitest.fn(() => ({
    get: vitest.fn(),
  })),
}));

describe("NotionIntegration", () => {
  afterEach(() => {
    queryCache.clear();
  });

  it("should render", async () => {
    render(
      <ReactQueryProvider>
        <NotionIntegration />
      </ReactQueryProvider>
    );

    expect(screen.getByTestId("notion-link-placeholder")).toBeInTheDocument();
  });

  it("should change status to success", async () => {
    render(
      <ReactQueryProvider>
        <NotionIntegration />
      </ReactQueryProvider>
    );

    expect(screen.getByTestId("notion-link-placeholder")).toBeInTheDocument();

    expect(await screen.findByTestId("notion-link")).toBeInTheDocument();
  });
});
