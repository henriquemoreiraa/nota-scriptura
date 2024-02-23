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

export const ChooseBookDialog = () => {
  const { getBooksFn, books, status } = useBooksContext();

  return (
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
            onFocus={() => getBooksFn()}
            isLoading={status === "pending"}
            placeholder="Selecione um livro"
          />
        </DialogOverlayCustom>
      </div>
      <DialogFooter>
        <Button variant="blue" disabled>
          Confirmar
        </Button>
      </DialogFooter>
    </>
  );
};
