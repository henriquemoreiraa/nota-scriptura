import { Button } from "@/components/ui/button";
import { NextLinkButton } from "@/components/ui/link-button";
import { ResizablePanel } from "@/components/ui/resizable";
import { NotionPageType } from "@/types/notion-pages";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ArrowRight, XCircle } from "lucide-react";
import Link from "next/link";

export const PageError = ({
  pageQuery,
}: {
  pageQuery: UseQueryResult<AxiosResponse<NotionPageType, any>, Error>;
}) => {
  return (
    <ResizablePanel
      defaultSize={100}
      className="flex flex-col justify-center items-center gap-8 h-[500px]"
    >
      {(pageQuery.error as AxiosError)?.response?.data === "No books found." ? (
        <>
          <h3 className="font-normal">
            Nenhum livro encontrado no banco de dados do Notion.
          </h3>
          <div className="flex items-center gap-5">
            <NextLinkButton variant="outline" href="/livros">
              Escolher livro
            </NextLinkButton>
            <Link
              href="/ler/?book=gn"
              className="flex items-center gap-1 font-normal text-sm text-link hover:underline hover:text-link-hover"
            >
              Quero apenas ler <ArrowRight className="size-4" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <h3 className="font-normal flex items-center gap-2">
            <XCircle className="text-red-500 size-5" /> Houve um erro!
          </h3>
          <div className="flex items-center gap-5">
            <NextLinkButton variant="outline" href="/livros">
              Escolher livro
            </NextLinkButton>
            <Button
              onClick={() => location.reload()}
              variant="link"
              className="flex items-center font-normal text-sm text-link hover:underline hover:text-link-hover p-0"
            >
              Recarregar a página
            </Button>
          </div>
        </>
      )}
    </ResizablePanel>
  );
};
