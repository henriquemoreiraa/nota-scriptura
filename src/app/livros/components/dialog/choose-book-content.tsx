"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { SeparatorTitle } from "@/components/ui/separator-title";
import { useBooksContext } from "@/context/book-context";
import { createOptions } from "@/utils/create-options";
import DialogOverlayCustom from "@/components/ui/dialog-overlay-custom";
import { TabsBookFilters } from "./components/tabs-book-filters";
import { ConfirmBook } from "./components/confirm-book";
import { useCustomSearchParams } from "@/hooks/use-set-search-params";

export const ChooseBookContent = () => {
  const { getBooksFn, books, status } = useBooksContext();
  const { createSearchParams, searchParams } = useCustomSearchParams();

  const book = books?.find(
    (book) => book.id.toString() === searchParams.get("book_id")
  );

  return searchParams.get("dialog_step") !== "confirm" ? (
    <>
      <DialogHeader>
        <DialogTitle>Selecione um livro abaixo</DialogTitle>
        <DialogDescription>
          Você pode optar por uma filtragem dos livros ou não.
        </DialogDescription>
      </DialogHeader>
      <TabsBookFilters />
      <div>
        <SeparatorTitle>Livro</SeparatorTitle>
        <DialogOverlayCustom>
          <Combobox
            name="livro"
            options={createOptions({ arr: books })}
            onSelect={(values) => createSearchParams("book_id", values[0])}
            onFocus={() => getBooksFn()}
            isLoading={status === "pending"}
            placeholder="Selecione um livro"
          />
        </DialogOverlayCustom>
      </div>
      <DialogFooter>
        <Button
          variant="blue"
          onClick={() => createSearchParams("dialog_step", "confirm")}
          disabled={!searchParams.get("book_id")}
        >
          Continuar
        </Button>
      </DialogFooter>
    </>
  ) : (
    <ConfirmBook.Root>
      <ConfirmBook.Name>{book?.name}</ConfirmBook.Name>
    </ConfirmBook.Root>
  );
};
