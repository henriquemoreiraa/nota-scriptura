"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { SeparatorTitle } from "@/components/ui/separator-title";
import { useBooksContext } from "@/context/book-context";
import { createOptions } from "@/utils/create-options";
import DialogOverlayCustom from "@/components/ui/dialog-overlay-custom";
import { TabsBookFilters } from "./components/tabs-book-filters";
import { Dices } from "lucide-react";
import { GenerateRandomBook } from "./components/generate-random-book";
import { useCustomSearchParams } from "@/hooks/use-set-search-params";

export const RandomBookContent = () => {
  const { createSearchParams, searchParams } = useCustomSearchParams();

  return searchParams.get("dialog_step") !== "confirm" ? (
    <>
      <DialogHeader>
        <DialogTitle>Gere um livro aleatório abaixo</DialogTitle>
        <DialogDescription>
          Você pode optar por uma filtragem dos livros ou não.
        </DialogDescription>
      </DialogHeader>
      <TabsBookFilters />
      <div>
        <SeparatorTitle>Livro</SeparatorTitle>
        <Button
          className="w-full flex gap-2"
          variant="outline"
          onClick={() => createSearchParams("dialog_step", "confirm")}
        >
          <Dices /> Gerar livro aleatório
        </Button>
      </div>
    </>
  ) : (
    <GenerateRandomBook />
  );
};
