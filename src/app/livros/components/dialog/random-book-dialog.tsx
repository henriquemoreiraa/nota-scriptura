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
import { ConfirmBook } from "./components/confirm-book";
import { useRouter, useSearchParams } from "next/navigation";

export const RandomBookDialog = () => {
  const { books } = useBooksContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  return searchParams.get("dialog_step") === "confirm" ? (
    <ConfirmBook>
      <GenerateRandomBook />
    </ConfirmBook>
  ) : (
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
        <DialogOverlayCustom>
          <div className="flex gap-3 items-center">
            <Combobox
              name="livro"
              options={createOptions({ arr: books })}
              placeholder="Gere um livro"
              disabled
            />
            <Button onClick={() => router.push("/livros/?dialog_step=confirm")}>
              <Dices />
            </Button>
          </div>
        </DialogOverlayCustom>
      </div>
    </>
  );
};
