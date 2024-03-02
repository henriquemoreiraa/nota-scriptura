"use client";

import { useBooksContext } from "@/context/book-context";
import { ConfirmBook } from "./components/confirm-book";
import { useCustomSearchParams } from "@/hooks/use-set-search-params";
import { useEffect } from "react";
import { Loading } from "@/components/loading";

export const GenesisBookContent = () => {
  const { getBooksFn, status } = useBooksContext();
  const { createSearchParams, searchParams } = useCustomSearchParams();

  useEffect(() => {
    if (!searchParams.get("dialog_step")) {
      getBooksFn();
      createSearchParams("book_name", "gênesis");
    }
  }, [searchParams]);

  return status === "pending" ? (
    <Loading />
  ) : (
    <ConfirmBook.Root>
      <ConfirmBook.Name>Gênesis</ConfirmBook.Name>
    </ConfirmBook.Root>
  );
};
