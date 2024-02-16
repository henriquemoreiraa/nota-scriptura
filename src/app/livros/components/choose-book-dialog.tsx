import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BookFilters from "./book-filters";
import { SeparatorTitle } from "@/components/ui/separator-title";

const ChooseBookDialog = () => {
  return (
    <DialogContent className="max-w-[600px]">
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
        <TabsContent value="account">
          <Combobox name="livro" data={[{ label: "livro", value: "livro" }]} />
        </TabsContent>
        <TabsContent
          value="password"
          className="flex flex-col justify-center items-center"
        >
          <DialogOverlay className="relative z-0 bg-transparent w-full flex flex-col gap-3 mb-10 v">
            <BookFilters />
          </DialogOverlay>
          <SeparatorTitle className="mb-1">Livro</SeparatorTitle>
          <Combobox name="livro" data={[{ label: "livro", value: "livro" }]} />
        </TabsContent>
      </Tabs>
      <DialogFooter>
        <Button variant="blue" disabled>
          Confirmar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ChooseBookDialog;
