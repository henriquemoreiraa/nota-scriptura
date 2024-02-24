import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBooksContext } from "@/context/book-context";
import { Dices } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ConfirmBook } from "./confirm-book";
import { useCustomSearchParams } from "@/hooks/use-set-search-params";

const TOTAL_SECONDS = 5000;
const INCREMENT_SECONDS = 200;

export const GenerateRandomBook = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const { books, getBooksFn, status } = useBooksContext();
  const { deleteSearchParams, createSearchParams, searchParams } =
    useCustomSearchParams();

  const bookId = searchParams.get("book_id");

  const book = useMemo(() => {
    return books?.[Math.floor(Math.random() * books.length)];
  }, [timeElapsed]);

  const isBookGenerationComplete =
    books?.length === 1 || timeElapsed === TOTAL_SECONDS;

  const progressPercentage = Math.min((timeElapsed / TOTAL_SECONDS) * 100, 100);

  useEffect(() => {
    if (books) {
      const timer = setTimeout(() => {
        if (isBookGenerationComplete) {
          createSearchParams("book_id", book.id.toString());
          return;
        }

        setTimeElapsed((prevTime) => prevTime + INCREMENT_SECONDS);
      }, INCREMENT_SECONDS);

      return () => clearTimeout(timer);
    }
  }, [timeElapsed, books]);

  useEffect(() => {
    getBooksFn();
  }, []);

  if (status === "pending") {
    return <Loading />;
  }

  if (status === "error") {
    return (
      <ConfirmBook.Root>
        <ConfirmBook.Error>
          Erro ao fazer busca dos livros. Clique em voltar e tente novamente.
        </ConfirmBook.Error>
      </ConfirmBook.Root>
    );
  }

  return (
    <ConfirmBook.Root>
      <div className="flex flex-col items-center">
        <ConfirmBook.Name>
          {book?.name}
          {isBookGenerationComplete ? "!" : "?"}
        </ConfirmBook.Name>
        <Progress
          data-visible={bookId ? null : true}
          value={progressPercentage}
          className="w-[60%] h-2 mt-3 data-visible"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                data-visible={bookId}
                variant="ghost"
                className="opacity-0 invisible data-[visible]:opacity-100 transition-all duration-75 data-[visible]:visible"
                onClick={() => {
                  setTimeElapsed(0);
                  deleteSearchParams("book_id");
                }}
              >
                <Dices />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Gerar outro livro</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </ConfirmBook.Root>
  );
};
