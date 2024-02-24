"use client";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NextLinkButton } from "@/components/ui/link-button";
import { useCustomSearchParams } from "@/hooks/use-set-search-params";
import { XCircle } from "lucide-react";
import { ReactNode } from "react";

interface ConfirmBookProps {
  children?: ReactNode;
}

const ConfirmBookRoot = ({ children }: ConfirmBookProps) => {
  const { createSearchParams, deleteSearchParams, searchParams } =
    useCustomSearchParams();
  const bookId = searchParams.get("book_id");

  return (
    <div className="flex flex-col justify-between gap-8">
      <DialogHeader>
        <DialogTitle>Confirmação</DialogTitle>
        <DialogDescription>
          Confirme o seu livro escolhido ou volte para escolher outro.
        </DialogDescription>
      </DialogHeader>
      {children}
      <DialogFooter className="w-full">
        {searchParams.get("dialog_step") && (
          <Button
            onClick={() => {
              deleteSearchParams("book_id");
              createSearchParams("dialog_step", "filters");
            }}
            variant="link"
          >
            Voltar
          </Button>
        )}
        {bookId && (
          <NextLinkButton href={`/ler/?book=${bookId}`} variant="blue">
            Confirmar
          </NextLinkButton>
        )}
      </DialogFooter>
    </div>
  );
};

const ConfirmBookName = ({ children }: ConfirmBookProps) => {
  return (
    <div className="text-center">
      <h1 className="text-xl font-medium">Seu livro escolhido é:</h1>
      <p className="text-3xl font-bold mt-2">{children}</p>
    </div>
  );
};

const ConfirmBookError = ({ children }: ConfirmBookProps) => {
  return (
    <div className="text-center">
      <h1 className="text-lg font-semibold flex items-center justify-center gap-2">
        <XCircle className="text-red-500 size-5" /> Houve um erro!
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </div>
  );
};

export const ConfirmBook = {
  Root: ConfirmBookRoot,
  Name: ConfirmBookName,
  Error: ConfirmBookError,
};
