"use client";

import { ConfirmBook } from "./components/confirm-book";
import { useCustomSearchParams } from "@/hooks/use-set-search-params";
import { useEffect } from "react";

export const GenesisBookContent = () => {
  const { createSearchParams, searchParams } = useCustomSearchParams();

  useEffect(() => {
    if (!searchParams.get("dialog_step")) {
      createSearchParams("book_name", "gênesis");
    }
  }, [searchParams]);

  return (
    <ConfirmBook.Root>
      <ConfirmBook.Name>Gênesis</ConfirmBook.Name>
    </ConfirmBook.Root>
  );
};
