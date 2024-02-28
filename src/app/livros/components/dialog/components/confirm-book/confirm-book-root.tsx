"use client";

import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBooksContext } from "@/context/book-context";
import { useCustomSearchParams } from "@/hooks/use-set-search-params";
import { Status } from "@/types/api";
import axios from "axios";
import { useState } from "react";
import { ConfirmBook, ConfirmBookProps } from ".";

export const ConfirmBookRoot = ({ children }: ConfirmBookProps) => {
  const [status, setStatus] = useState<Status>("idle");
  const { books } = useBooksContext();
  const { createSearchParams, deleteSearchParams, searchParams, router } =
    useCustomSearchParams();

  const bookName = searchParams.get("book_name");

  const confirm = async () => {
    setStatus("pending");
    try {
      const bookAbreev = books.find((book) => book.name === bookName)?.abbrev;
      await axios.post("/api/livros/confirm", {
        bookAbreev,
      });
      router.push(`/ler/?book=${bookAbreev}`);
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "pending") {
    return (
      <div className="flex flex-col justify-center items-center">
        <Loading />
        <p className="mt-2 text-sm text-muted-foreground">
          Aguarde enquanto confirmamos o livro escolhido.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <ConfirmBook.Root>
        <ConfirmBook.Error>
          Erro ao confirmar o livro. Clique em confirmar para tentar novamente.
        </ConfirmBook.Error>
      </ConfirmBook.Root>
    );
  }

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
              deleteSearchParams("book_name");
              createSearchParams("dialog_step", "filters");
            }}
            variant="link"
          >
            Voltar
          </Button>
        )}
        {bookName && (
          <Button onClick={confirm} variant="blue">
            Confirmar
          </Button>
        )}
      </DialogFooter>
    </div>
  );
};
