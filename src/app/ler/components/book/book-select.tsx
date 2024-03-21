import { TabsBookFilters } from "@/app/livros/components/dialog/components/tabs-book-filters";
import { Combobox } from "@/components/ui/combobox";
import { SeparatorTitle } from "@/components/ui/separator-title";
import { useBooksContext } from "@/context/book-context";
import { useBible } from "@/hooks/use-bible";
import { useCustomSearchParams } from "@/hooks/use-set-search-params";
import { createOptions } from "@/utils/create-options";
import { useEffect, useState } from "react";
import { BookSelectLoading } from "./book-select-loading";

export const BookSelect = () => {
  const [firstRender, setFirstRender] = useState(false);
  const { versesQuery, bible } = useBible();
  const { getBooksFn, books, status } = useBooksContext();
  const { searchParams, createSearchParams, deleteSearchParams } =
    useCustomSearchParams();

  // As function beecause of localStorage Next.js error
  const currentBook = () =>
    localStorage.getItem("book") || searchParams.get("book") || "gn";
  const currentChapter = () =>
    localStorage.getItem("chapter") || searchParams.get("chapter") || "1";

  const book = books?.find((book) => book.abbrev.pt === currentBook());

  const setSearchParamsAndStorage = (key: string, value: string) => {
    createSearchParams(key, value);
    localStorage.setItem(key, value);
  };

  useEffect(() => {
    if (!versesQuery?.isPending && searchParams.get("book") !== "_" && bible) {
      setFirstRender(true);
    }

    createSearchParams("book", currentBook());
    createSearchParams("chapter", currentChapter());

    versesQuery?.mutateAsync({
      book: currentBook(),
      chapter: parseInt(currentChapter() as string),
    });
  }, [searchParams]);

  if (
    (versesQuery?.status === "pending" || versesQuery?.status === "idle") &&
    !firstRender
  ) {
    return <BookSelectLoading />;
  }

  return (
    <div className="w-full p-4 pl-6">
      <TabsBookFilters />
      <div>
        <SeparatorTitle>Livro</SeparatorTitle>
        <Combobox
          name="livro"
          options={createOptions({
            arr: books,
            value: "name",
            label: "name",
          })}
          onSelect={(values) => {
            setSearchParamsAndStorage(
              "book",
              books.find((b) => b.name.toLocaleLowerCase() === values[0])
                ?.abbrev.pt as string
            );
            deleteSearchParams("chapter");
            localStorage.removeItem("chapter");
          }}
          values={[{ label: bible?.book.name, value: bible?.book.name }]}
          onFocus={() => getBooksFn()}
          isLoading={
            status === "pending" ||
            versesQuery?.isPending ||
            versesQuery?.isIdle
          }
          placeholder="Selecione um livro"
        />
      </div>
      <div className="mt-5">
        <SeparatorTitle>Capítulo</SeparatorTitle>
        <Combobox
          name="Capítulo"
          options={Array(book?.chapters)
            .fill(0)
            .map((_, index) => ({
              label: `${index + 1}`,
              value: `${index + 1}`,
            }))}
          onSelect={(values) => setSearchParamsAndStorage("chapter", values[0])}
          values={[
            {
              label: currentChapter(),
              value: "",
            },
          ]}
          onFocus={() => getBooksFn()}
          isLoading={status === "pending"}
          placeholder="Selecione um capítulo"
        />
      </div>
    </div>
  );
};
