import { render, screen } from "@testing-library/react";
import { GenerateRandomBook } from "./generate-random-book";
import { BookContext } from "@/context/book-context";
import { describe, expect, it, vitest } from "vitest";
import { Dialog } from "@/components/ui/dialog";
import { Status } from "@/types/api";

vitest.mock("next/navigation", () => ({
  ...vitest.importActual("next/navigation"),
  useRouter: vitest.fn(() => ({
    push: vitest.fn(),
  })),
  useSearchParams: vitest.fn(() => ({
    get: () => vitest.fn(),
  })),
  usePathname: vitest.fn(),
}));

interface BookContextValue {
  status?: Status;
  books?: { name: string }[];
}

describe("GenerateRandomBook", () => {
  const renderGenerateRandomBook = (value?: BookContextValue) => {
    render(
      <BookContext.Provider
        value={{
          bookFilters: { current: {} },
          getBooksFn: async () => new Promise(() => {}),
          books: [] as any,
          status: "idle",
          ...value,
        }}
      >
        <Dialog>
          <GenerateRandomBook />
        </Dialog>
      </BookContext.Provider>
    );
  };

  it("renders without crashing", () => {
    renderGenerateRandomBook();
  });

  it("displays loading spinner when fetching books", async () => {
    renderGenerateRandomBook({ status: "pending" });

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("displays error message when book fetching fails", async () => {
    renderGenerateRandomBook({ status: "error" });

    expect(
      screen.getByText(
        "Erro ao fazer busca dos livros. Clique em voltar e tente novamente."
      )
    ).toBeInTheDocument();
  });

  it("generates a random book and displays its name", async () => {
    renderGenerateRandomBook({
      status: "success",
      books: [{ name: "Book Test" }],
    });

    expect(screen.getByText(/Book Test/i)).toBeInTheDocument();
  });
});
