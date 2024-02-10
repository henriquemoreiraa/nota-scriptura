import { render, screen } from "@testing-library/react";
import { NotionIntegration } from "./notion-integration";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { afterEach, expect, describe, it, vitest, beforeAll } from "vitest";
import { Toaster } from "@/components/ui/toaster";
import { server } from "@/mocks/browser";
import { handlers } from "@/mocks/handlers";
import { ReactNode } from "react";

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
  let queryClient: QueryClient;

  beforeAll(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
  });

  afterEach(() => {
    queryCache.clear();
  });

  const renderNotionIntegration = (children?: ReactNode) => {
    render(
      <QueryClientProvider client={queryClient}>
        <NotionIntegration />
        {children}
      </QueryClientProvider>
    );
  };

  it("should render", async () => {
    renderNotionIntegration();

    expect(screen.getByTestId("notion-link-placeholder")).toBeInTheDocument();
  });

  it("should change status to success", async () => {
    renderNotionIntegration();

    expect(await screen.findByTestId("notion-link")).toBeInTheDocument();
  });

  it("should render pending toast", async () => {
    renderNotionIntegration(<Toaster />);

    expect(await screen.findByText("Aguarde um momento!")).toBeInTheDocument();
    expect(
      await screen.findByText("Aguarde enquanto integramos ao Notion.")
    ).toBeInTheDocument();
  });

  it("should render error toast", async () => {
    server.use(handlers.getAccessTokenError);

    renderNotionIntegration(<Toaster />);

    expect(await screen.findByText("Houve um erro!")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Erro ao tentar definir o token de acesso do Notion."
      )
    ).toBeInTheDocument();
  });
});
