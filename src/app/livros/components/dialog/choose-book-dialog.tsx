"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BookFilters from "../book-filters";
import { SeparatorTitle } from "@/components/ui/separator-title";
import { useBooksContext } from "@/context/book-context";
import { createOptions } from "@/utils/create-options";
import DialogOverlayCustom from "@/components/ui/dialog-overlay-custom";

const ChooseBookDialog = () => {
  const { getBooksFn, books } = useBooksContext();

  return (
    <DialogContent className="max-w-[600px] max-h-full overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Selecione um livro abaixo</DialogTitle>
        <DialogDescription>
          Você pode optar por uma filtragem dos livros ou não.
        </DialogDescription>
      </DialogHeader>
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-2 mb-5">
          <TabsTrigger value="account">Sem filtro</TabsTrigger>
          <TabsTrigger value="password">Com filtro</TabsTrigger>
        </TabsList>
        <TabsContent
          value="password"
          className="flex flex-col justify-center items-center"
        >
          <div className="w-full mb-8">
            <DialogOverlayCustom>
              <BookFilters />
            </DialogOverlayCustom>
          </div>
        </TabsContent>
      </Tabs>
      <div>
        <SeparatorTitle>Livro</SeparatorTitle>
        <DialogOverlayCustom>
          <Combobox
            name="livro"
            options={createOptions({ arr: books })}
            onFocus={getBooksFn}
          />
          s
        </DialogOverlayCustom>
      </div>
      <DialogFooter>
        <Button variant="blue" disabled>
          Confirmar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ChooseBookDialog;
