import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { NextLinkButton } from "@/components/ui/link-button";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBooksContext } from "@/context/book-context";
import { Dices } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TOTAL_SECONDS = 5000;
const INCREMENT_SECONDS = 200;

export const GenerateRandomBook = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const { books, getBooksFn, status } = useBooksContext();
  const router = useRouter();

  const isBookGenerationComplete =
    books?.length === 1 || timeElapsed === TOTAL_SECONDS;

  const progressPercentage = Math.min((timeElapsed / TOTAL_SECONDS) * 100, 100);

  const book = books?.[Math.floor(Math.random() * books.length)];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isBookGenerationComplete) {
        return;
      }

      setTimeElapsed((prevTime) => prevTime + INCREMENT_SECONDS);
    }, INCREMENT_SECONDS);

    return () => clearTimeout(timer);
  }, [timeElapsed]);

  useEffect(() => {
    getBooksFn();
  }, []);

  if (status !== "success") {
    return <Loading />;
  }

  return (
    <>
      <p className="text-3xl font-bold my-2">
        {book?.name}
        {isBookGenerationComplete ? "!" : "?"}
      </p>
      {!isBookGenerationComplete && (
        <Progress value={progressPercentage} className="w-[60%] h-2" />
      )}
      {isBookGenerationComplete && (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" onClick={() => setTimeElapsed(0)}>
                  <Dices />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Gerar outro livro</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DialogFooter className="mt-5 w-full">
            <Button
              onClick={() => router.push("/livros/?dialog_step=filters")}
              variant="link"
            >
              Voltar
            </Button>
            <NextLinkButton
              href={`/ler/?book=${book.abbrev.pt}`}
              variant="blue"
            >
              Confirmar
            </NextLinkButton>
          </DialogFooter>
        </>
      )}
    </>
  );
};
